# Datasets for HEKSM

This folder contains all datasets used throughout the **Homomorphic Encryption-based Keyword Search Mechanism (HEKSM)** project, 
including raw email data, cleaned subsets, and encrypted representations.

---

## Download the Original Dataset

The original Enron email dataset used in this study is publicly available and can be downloaded from:

[https://www.cs.cmu.edu/~enron/](https://www.cs.cmu.edu/~enron/)

Once downloaded, place the extracted CSV or MBOX files in the `datasets/original/` directory.

---

## Folder Structure

```
datasets/
├── original/ # Raw dataset (e.g., emails.csv from Enron)
├── cleaned/ # Preprocessed subsets for encryption and plaintext testing
│ ├── split_emails.csv
│ └── cleaned_split.csv
└── encrypted/ # Encrypted dictionary, token index, and ciphertext
├── encrypted_dict.json
├── token_index_map.json
└── encrypted_data.json
```

---

## How the Dataset Is Used

- `original/`: Contains the full raw Enron corpus (e.g., `emails.csv`). Used only for preprocessing.
- `cleaned/`: Holds filtered and sanitized subsets used for both plaintext and encrypted tests.
- `encrypted/`: Contains data encrypted using the BFV Homomorphic Encryption scheme.

> These encrypted files are generated using the `new_encryption` executable and used during search.

---

## Encrypted Data Disclaimer

Due to file size and GitHub limitations, the encrypted files (`*.json`) under `datasets/encrypted/` are **not included** in this repository.

Please regenerate them using:

```
cd scripts/HE-scripts/build
./new_encryption

```

This will automatically create:

* `indexed_encrypted_emails.json`
* Encrypted token index and dictionary

---

## Related Scripts

- `scripts/splits/clean_n_split_1.py` – Cleans and splits raw dataset
- `scripts/splits/top_keywords.py` – Extracts top frequent keywords

---

## License

The Enron dataset is publicly available for academic use. All processed versions used here are for research purposes only.

