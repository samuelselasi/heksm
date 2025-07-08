#include "seal/seal.h"
#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <algorithm>
#include <cctype>
#include <nlohmann/json.hpp>
#include <filesystem>
#include <chrono>
#include <iomanip>

#ifdef __unix__
#include <sys/stat.h>
#endif

#include <openssl/evp.h> // Modern OpenSSL EVP interface

using namespace std;
using namespace seal;
using json = nlohmann::json;

// ----------- Utility Functions -------------
void log_msg(const string& msg) {
    cerr << "[" << std::chrono::system_clock::to_time_t(std::chrono::system_clock::now()) << "] " << msg << endl;
}

// Modern OpenSSL EVP API for SHA-256
string sha256(const string& data) {
    unsigned char hash[EVP_MAX_MD_SIZE];
    unsigned int length = 0;

    EVP_MD_CTX* ctx = EVP_MD_CTX_new();
    if (!ctx)
        throw runtime_error("Failed to create EVP_MD_CTX");

    if (1 != EVP_DigestInit_ex(ctx, EVP_sha256(), nullptr))
        throw runtime_error("EVP_DigestInit_ex failed");
    if (1 != EVP_DigestUpdate(ctx, data.data(), data.size()))
        throw runtime_error("EVP_DigestUpdate failed");
    if (1 != EVP_DigestFinal_ex(ctx, hash, &length))
        throw runtime_error("EVP_DigestFinal_ex failed");

    EVP_MD_CTX_free(ctx);

    stringstream ss;
    for (unsigned int i = 0; i < length; ++i)
        ss << hex << setw(2) << setfill('0') << (int)hash[i];
    return ss.str();
}

// For Unicode-aware normalization, consider using ICU; here, we only ASCII-filter
string sanitize(const string &text) {
    string cleaned;
    for (unsigned char c : text) {
        if (isalnum(c) || c == ' ') cleaned += tolower(c);
    }
    return cleaned;
}

vector<string> tokenize(const string &text) {
    stringstream ss(text);
    string word;
    vector<string> tokens;
    while (ss >> word) tokens.push_back(word);
    return tokens;
}

vector<uint64_t> encode_word(const string &word, size_t slot_count) {
    vector<uint64_t> result(slot_count, 0);
    for (size_t i = 0; i < word.size() && i < slot_count; ++i)
        result[i] = static_cast<uint64_t>(word[i]);
    return result;
}

string to_base64(const string &input) {
    static const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    string result;
    int val = 0, valb = -6;
    for (unsigned char c : input) {
        val = (val << 8) + c;
        valb += 8;
        while (valb >= 0) {
            result.push_back(chars[(val >> valb) & 0x3F]);
            valb -= 6;
        }
    }
    if (valb > -6)
        result.push_back(chars[((val << 8) >> (valb + 8)) & 0x3F]);
    while (result.size() % 4)
        result.push_back('=');
    return result;
}

void secure_file_permissions(const string& filepath) {
#ifdef __unix__
    chmod(filepath.c_str(), S_IRUSR | S_IWUSR);
#endif
}

int main(int argc, char* argv[]) {
    auto start_time = chrono::high_resolution_clock::now();

    // Configurable Section (matches old code defaults)
    size_t poly_modulus_degree = 8192;
    int plain_modulus_bits = 20;
    string csv_path = "../../datasets/cleaned/cleaned_split-1.csv";
    string output_path = "../../datasets/encrypted/indexed_encrypted_emails.json";
    string pubkey_path = "./build/public.key";
    string seckey_path = "./build/secret.key";
    size_t email_limit = 60;

    if (argc > 1) csv_path = argv[1];
    if (argc > 2) output_path = argv[2];
    if (argc > 3) pubkey_path = argv[3];
    if (argc > 4) seckey_path = argv[4];
    if (argc > 5) email_limit = stoi(argv[5]);

    log_msg("Reading from: " + csv_path);

    // SEAL Parameters
    EncryptionParameters parms(scheme_type::bfv);
    parms.set_poly_modulus_degree(poly_modulus_degree);
    parms.set_coeff_modulus(CoeffModulus::BFVDefault(poly_modulus_degree));
    parms.set_plain_modulus(PlainModulus::Batching(poly_modulus_degree, plain_modulus_bits));

    SEALContext context(parms);
    KeyGenerator keygen(context);
    PublicKey public_key;
    keygen.create_public_key(public_key);
    SecretKey secret_key = keygen.secret_key();
    Encryptor encryptor(context, public_key);
    BatchEncoder encoder(context);
    size_t slot_count = encoder.slot_count();

    // Save keys securely
    {
        ofstream pub_out(pubkey_path, ios::binary);
        ofstream sec_out(seckey_path, ios::binary);
        if (!pub_out || !sec_out) {
            log_msg("Failed to open key files for writing.");
            return 1;
        }
        public_key.save(pub_out);
        secret_key.save(sec_out);
        pub_out.close(); sec_out.close();
        secure_file_permissions(pubkey_path);
        secure_file_permissions(seckey_path);
        log_msg("Keys saved with restricted permissions.");
    }

    // CSV Reading & Preprocessing (single-threaded, match old logic)
    ifstream csv(csv_path);
    if (!csv.is_open()) {
        log_msg("Failed to open CSV file.");
        return 1;
    }
    string header, line;
    getline(csv, header);

    unordered_map<string, string> encrypted_dict;  // word → encrypted base64
    json email_entries = json::array();

    size_t email_count = 0;

    while (getline(csv, line)) {
        if (++email_count > email_limit) break;
        stringstream ss(line);
        string email_id, from, to, cc, date, subject, body, message;
        getline(ss, email_id, ',');
        getline(ss, from, ',');
        getline(ss, to, ',');
        getline(ss, cc, ',');
        getline(ss, date, ',');
        getline(ss, subject, ',');
        getline(ss, body, ',');
        getline(ss, message);

        string message_full = sanitize(subject + " " + body + " " + message);
        message_full.erase(remove_if(message_full.begin(), message_full.end(), [](char c) {
            return static_cast<unsigned char>(c) > 127;
        }), message_full.end());

        vector<string> words = tokenize(message_full);
        unordered_set<string> unique_words(words.begin(), words.end());

        vector<string> token_indices;
        for (const string &word : unique_words) {
            if (encrypted_dict.find(word) == encrypted_dict.end()) {
                Plaintext pt;
                encoder.encode(encode_word(word, slot_count), pt);
                Ciphertext ctxt;
                encryptor.encrypt(pt, ctxt);
                stringstream ss;
                ctxt.save(ss);
                encrypted_dict[word] = to_base64(ss.str());
            }
            token_indices.push_back(word);
        }

        // Add hash info as in new code, but does not affect logic
        string raw_content = subject + " " + body + " " + message;
        string sanitized_content = sanitize(raw_content);
        string hash_raw = sha256(raw_content);
        string hash_sanitized = sha256(sanitized_content);

        json entry;
        entry["file"] = email_id;
        entry["tokens"] = token_indices;
        entry["hash_raw"] = hash_raw;
        entry["hash_sanitized"] = hash_sanitized;
        email_entries.push_back(entry);
    }

    json output;
    output["dictionary"] = encrypted_dict;
    output["emails"] = email_entries;

    ofstream out(output_path);
    if (!out.is_open()) {
        log_msg("Failed to write JSON output.");
        return 1;
    }
    out << output.dump(2);
    out.close();
    log_msg("Encrypted index saved to: " + output_path);

    // Audit Log
    ofstream audit_log("encryption_audit.log", ios::app);
    audit_log << "[" << std::chrono::system_clock::to_time_t(std::chrono::system_clock::now())
              << "] " << email_count << " emails processed. Output: " << output_path << endl;
    audit_log.close();

    auto end_time = chrono::high_resolution_clock::now();
    auto duration = chrono::duration_cast<chrono::milliseconds>(end_time - start_time);
    cout << "Encrypted and saved in: " << duration.count() << " ms" << endl;
    cout << "Output file: " << output_path << endl;
    cout << "Audit log: encryption_audit.log" << endl;
    return 0;
}
