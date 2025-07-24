// Include necessary libraries for encryption, input/output, file handling, and JSON
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
#include <chrono>
#include <iomanip>

using namespace std;
using namespace seal;
using json = nlohmann::json;

// Function to clean a text string by converting to lowercase and removing non-alphanumeric characters
string sanitize(const string &text) {
    string cleaned;
    for (char c : text) {
        if (isalnum(c) || c == ' ') cleaned += tolower(c);
    }
    return cleaned;
}

// Tokenize a string into individual words (space-separated)
vector<string> tokenize(const string &text) {
    stringstream ss(text);
    string word;
    vector<string> tokens;
    while (ss >> word) tokens.push_back(word);
    return tokens;
}

// Encode a word into a vector of uint64_t integers to fit into a BFV slot
vector<uint64_t> encode_word(const string &word, size_t slot_count) {
    vector<uint64_t> result(slot_count, 0);
    for (size_t i = 0; i < word.size() && i < slot_count; ++i)
        result[i] = static_cast<uint64_t>(word[i]);
    return result;
}

// Base64 encode a string (used for encoding the encrypted ciphertexts as strings)
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

int main() {
    auto start_time = chrono::high_resolution_clock::now();

    // Set BFV encryption parameters
    EncryptionParameters parms(scheme_type::bfv);
    parms.set_poly_modulus_degree(8192); // Degree of polynomial modulus (affects performance and security)
    parms.set_coeff_modulus(CoeffModulus::BFVDefault(8192)); // Coefficient modulus
    parms.set_plain_modulus(PlainModulus::Batching(8192, 20)); // Plaintext modulus suitable for batching

    // Set up the encryption context and keys
    SEALContext context(parms);
    KeyGenerator keygen(context);
    PublicKey public_key;
    keygen.create_public_key(public_key);
    SecretKey secret_key = keygen.secret_key();
    Encryptor encryptor(context, public_key);
    BatchEncoder encoder(context);

    // Save keys to files
    ofstream pub_out("./build/public.key", ios::binary);
    ofstream sec_out("./build/secret.key", ios::binary);
    public_key.save(pub_out);
    secret_key.save(sec_out);

    // Open the cleaned email CSV file
    ifstream csv("../../datasets/cleaned/cleaned_split-1.csv");
    string header, line;
    getline(csv, header); // Skip the header

    // Dictionary to store encrypted representations of unique words
    unordered_map<string, string> encrypted_dict;
    json email_entries = json::array();

    size_t slot_count = encoder.slot_count();
    int email_count = 0;

    // Process each email (limit to 60 for the test)
    while (getline(csv, line)) {
        if (++email_count > 60) break;
        stringstream ss(line);
        string email_id, from, to, cc, date, subject, body, message;

        // Extract each field from the CSV line
        getline(ss, email_id, ',');
        getline(ss, from, ',');
        getline(ss, to, ',');
        getline(ss, cc, ',');
        getline(ss, date, ',');
        getline(ss, subject, ',');
        getline(ss, body, ',');
        getline(ss, message);

        // Sanitize and merge relevant text fields
        message = sanitize(subject + " " + body + " " + message);
        message.erase(remove_if(message.begin(), message.end(), [](char c) {
            return static_cast<unsigned char>(c) > 127;
        }), message.end());

        // Tokenize and identify unique words
        vector<string> words = tokenize(message);
        unordered_set<string> unique_words(words.begin(), words.end());

        vector<string> token_indices;

        // Encrypt each unique word if not already encrypted
        for (const string &word : unique_words) {
            if (encrypted_dict.find(word) == encrypted_dict.end()) {
                Plaintext pt;
                encoder.encode(encode_word(word, slot_count), pt);
                Ciphertext ctxt;
                encryptor.encrypt(pt, ctxt);
                stringstream ss;
                ctxt.save(ss);
                encrypted_dict[word] = to_base64(ss.str()); // Store as base64 string
            }
            token_indices.push_back(word); // Track plaintext word for indexing
        }

        // Record email ID and associated token list
        json entry;
        entry["file"] = email_id;
        entry["tokens"] = token_indices;
        email_entries.push_back(entry);
    }

    // Save output as JSON
    json output;
    output["dictionary"] = encrypted_dict;
    output["emails"] = email_entries;

    ofstream out("../../datasets/encrypted/indexed_encrypted_emails.json");
    out << output.dump(2);

    // Print timing and output file location
    auto end_time = chrono::high_resolution_clock::now();
    auto duration = chrono::duration_cast<chrono::milliseconds>(end_time - start_time);
    cout << "Encrypted and saved in: " << duration.count() << " ms\n";
    cout << "Output file: ../../datasets/encrypted/indexed_encrypted_emails.json\n";
    return 0;
}
