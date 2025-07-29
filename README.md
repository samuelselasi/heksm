# HEKSM: Homomorphic Encryption-based Keyword Search Mechanism
> Securing Third-Party Data in Digital Forensics Investigations Using Homomorphic Encryption

---

<img width="1920" height="1080" alt="interface" src="https://github.com/user-attachments/assets/7d273b62-b9d4-457f-a142-b4c515f3b153" />

---

## Overview

This project implements a privacy-preserving forensic keyword search mechanism using the Brakerski/Fan-Vercauteren (BFV) Homomorphic Encryption scheme. It is part of an MSc thesis at the University of Ghana focused on minimizing third-party data exposure during digital forensic investigations.

Homomorphic Encryption (HE) allows search operations to be conducted directly on encrypted datasets, eliminating the need for decryption and ensuring sensitive information remains protected at all times. This repository contains the full implementation pipeline, evaluation scripts, and documentation supporting encrypted search on the Enron email dataset.

---
## Motivation

Digital forensic tools often expose more data than necessary, violating the privacy of individuals not under investigation. Existing filtering and audit-based approaches offer limited protection and rely on investigator discretion. This project addresses that gap with a cryptographically enforced solution that supports:

- Encrypted search with no plaintext exposure
- Compliance with GDPR and privacy-preserving principles
- Balance between forensic utility and ethical data handling

---

## Key Features

- **End-to-End Encryption** using Microsoft SEAL (BFV Scheme)
- **Encrypted Keyword Search** without decryption
- **Encrypted Dictionary Indexing** for fast lookup
- **Evaluation Scripts** for precision, recall, F1-score, memory, and latency
- **Forensic Audit Readiness** aligned with legal and ethical standards

---

## Architectue

The framework is implemented in C++ using [Microsoft SEAL](https://github.com/microsoft/SEAL), with preprocessing and evaluation tools in Python.

### Workflow

1. **Dataset Preparation** – Preprocess [Enron emails](https://www.cs.cmu.edu/~enron/)
2. **Tokenization** – Generate top keywords and build token index
3. **Encryption** – Encode dictionary entries using BFV
4. **Keyword Search** – Query encrypted index
5. **Evaluation** – Compute precision, recall, memory usage, and time metrics

> See [`/Scipts`](./scripts) directory for full implementation

---

## Results Summary

| Metric                    | Encrypted Search | Plaintext Search |
|---------------------------|------------------|------------------|
| Precision                 | 100%             | 100%             |
| Recall                    | 100%             | 100%             |
| F1 Score                  | 1.00             | 1.00             |
| Avg Search Time           | 89.9s            | 0.50s            |
| Memory Usage (per query) | ~114MB           | ~8MB             |
| Data Exposure             | 0%               | Full Access      |

> Detailed analysis is available in the `analysis/` folder.

## Diectory Structure

```

heksm/
├── datasets/
│ ├── original/ # Raw Enron dataset (emails.csv, full corpus)
│ ├── cleaned/ # Cleaned and subset CSVs for analysis
│ │ ├── split_emails.csv # Split set (e.g., 60 emails)
│ │ └── cleaned_split.csv # Sanitized version for tokenization
│ └── encrypted/ # Encrypted dictionary and token index
│ ├── encrypted_dict.json
│ ├── token_index_map.json
│ └── encrypted_data.json
│
├── scripts/
│ ├── plaintext/ # Plaintext keyword search (Python)
│ │ ├── search_plaintext.py
│ │ └── batch_search_plaintext.py
│ ├── HE-scripts/ # Homomorphic encryption search (C++)
│ │ ├── new_encryption.cpp # Optimized encryption with SEAL
│ │ ├── new_search.cpp # Encrypted keyword search logic
│ │ └── seal/ # Microsoft SEAL headers
│
├── analysis/ # Evaluation scripts and output
│ ├── precision_and_recall.py
│ ├── search_memory_usage.csv
│ └── encrypted_vs_plaintext_plot.ipynb
│
├── appendix/ # Thesis support documents
│ ├── seminar_slides/
│ ├── diagrams/
│ └── code_explanations.md
│
├── tools/ # Utility scripts and benchmark helpers
│ ├── clean.py
│ └── top_keywords_generator.py
│
├── results/ # Output of test runs and evaluation
│ ├── matched_keywords.json
│ └── timing_report.txt
│
├── README.md
├── LICENSE
└── requirements.txt

```

---

## Reproducing Experiments

To make this project portable and fully reproducible, a complete setup script is provided.

### 1. Installation

Clone the repository and run the provided installation script:

```
git clone https://github.com/samuelselasi/heksm.git
cd heksm
bash install_all.sh
```

This script will:

- Install all required Python libraries listed in [requirements.txt](./requirements.txt)
- Install C++ build tools (`g++`, `cmake`, `make`)
- Clone and build the latest version of **Microsoft SEAL**
- Configure your system to support encrypted keyword search using BFV
- Compiles the C++ scripts under [HE-scripts](./scripts/HE-scripts/)


### 2. Dataset Preprocessing

Clean and split the dataset, and extract top keywords:

```
# Clean and split the original email dataset
python3 scripts/splits/clean_n_split_1.py

# Generate top 10 keywords for searching
python3 scripts/splits/top_keywords.py
```

The cleaned subset and keyword list will be placed under:

* [Cleaned Datasets](./datasets/cleaned/)
* [Splits](./scripts/splits/top_keywords.json)


### 3. Encryption Phase

Compile and run the C++ encryption script:

```
cd scripts/HE-scripts
mkdir -p build && cd build
cmake ..
make

# Run encryption executable (this creates encrypted dictionary + index)
./new_encryption

```

This generates:

* `indexed_encrypted_emails.json` under [encrypted](./datasets/encrypted/)
* `Public` and `secret` keys saved in [build](./scripts/HE-scripts/build/)


### 4. Encrypted Keyword Search

Run the homomorphic keyword search:

```
./new_search
```

Matches (if found) will be printed in the terminal.

You can also test batched search using:

```
python3 run_encrypted_searches.py

```


### Plaintext Baseline

Run plaintext keyword search for comparison:

```
python3 scripts/plaintext-scripts/run_plaintext_searches.py
```


### Evaluation & Analysis

Measure performance and visualize metrics:

```
cd scripts/analysis

# Measure precision, recall
python3 precision_and_recall.py

# Measure and log memory usage
bash measure_search_memory.sh
bash plaintext_memory_usage.sh

# Optional visualization (requires matplotlib)
python3 plot_metrics.py
```

Artifacts generated:

* Precision/recall report ([CSV](./analysis/search_memory_usage.csv) + [PNG](./analysis/precision_recall_plot.png))
* Memory usage logs for [encrypted](analysis/search_memory_usage.csv) vs. [plaintext](./analysis/plaintext_memory_usage.csv)
* Search result [JSONs](./analysis/encrypted_results.json)


### Summary of Key Files

---

### Summary of Key Files

| Phase               | File(s) Involved                                                                 |
|---------------------|----------------------------------------------------------------------------------|
| Dataset Prep        | `clean_n_split_1.py`, `top_keywords.py`                                         |
| Encryption          | `new_encryption.cpp` → `new_encryption`                                         |
| Search              | `new_search.cpp` → `new_search`, `run_encrypted_searches.py`                    |
| Plaintext Baseline  | `run_plaintext_searches.py`, `keyword_search_1.py`, `keyword_search_2.py`       |
| Evaluation          | `precision_and_recall.py`, `measure_search_memory.sh`, `plaintext_memory_usage.sh` |

---

## Academic Context

This repository supports the MSc thesis:

> "Securing Third-Party Data in Forensic Investigations Using Homomorphic Encryption"
> Samuel Selasi Kporvie
> University of Ghana, 2025


## Privacy Compliance

This framework is aligned with key privacy and legal standards, including:

* General Data Protection Regulation (GDPR)
* Principles for Privacy-Preserving Digital Forensics
* Evidentiary Integrity in Cryptographic Forensics


## Future Enhancements

* Multi-keyword and phrase-based encrypted search
* Integration with forensic automation platforms
* Hardware acceleration using GPUs or FPGAs


## Dataset

A subset of the **Enron Email Dataset** in CSV form was used.

* **Source**: [Enron Email Dataset](https://www.cs.cmu.edu/~enron/)
* **Subset Used**: 1000 emails (100 emails per batch manually selected and split)



**Author:** Samuel Selasi

**University:** University of Ghana

**Thesis Phase:** Implementation Phase 1

**Focus:** Secure keyword-based forensic investigation using Homomorphic Encryption (HE) and comparison with traditional plaintext methods.

---

## Notes

* You can increase the dataset size by modifying the loop in [encryption script](./scripts/HE-scripts/new_encryption.cpp)
```
if (++email_count > 100) break;
```

* Current implementation only uses **keyword equality matching**. Advanced features like fuzzy search or multi-keyword logic will be explored in future phases.

---

## Acknowledgements

* Supervisor: Dr. Edward Danso Ansong
* Enron Corpus Dataset: [Carnegie Mellon University](https://www.cs.cmu.edu/~enron/)
* Frontend Enginner: [Eugene Agyei Osae](https://github.com/quameEugene)

## Contact

For academic inquiries, collaborations, 
or questions about the implementation, 
feel free to open an issue or contact:
sskporvie001@st.ug.edu.gh

## License

This project is licensed under the [MIT License](LICENSE).

