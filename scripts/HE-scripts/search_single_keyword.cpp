
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

string sanitize(const string &text) {
    string cleaned;
    for (char c : text) {
        if (isalnum(c) || c == ' ') cleaned += tolower(c);
    }
    return cleaned;
}

int main(int argc, char* argv[]) {
    if (argc < 2) {
        cout << "Usage: ./search_single_keyword <keyword>\n";
        return 1;
    }

    string keyword = sanitize(argv[1]);
    cout << "Searching for keyword: '" << keyword << "'\n" << endl;

    auto start_time = chrono::high_resolution_clock::now();

    ifstream file("../../datasets/encrypted/indexed_encrypted_emails.json");
    if (!file.is_open()) {
        cerr << "Failed to open encrypted index file.\n";
        return 1;
    }

    json data;
    file >> data;

    vector<string> matches;

    for (const auto& email : data["emails"]) {
        string file_id = email["file"];
        for (const auto& token : email["tokens"]) {
            if (sanitize(token.get<string>()) == keyword) {
                matches.push_back(file_id);
                break;
            }
        }
    }

    auto end_time = chrono::high_resolution_clock::now();
    auto duration = chrono::duration_cast<chrono::milliseconds>(end_time - start_time).count();

    cout << matches.size() << " match(es) found in " << duration << " ms\n" << endl;
    for (const auto& id : matches) {
        cout << "ID: " << id << endl;
    }

    return 0;
}
