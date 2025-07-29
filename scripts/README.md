# HEKSM Scripts

This folder contains all the core logic scripts used in the **Homomorphic Encryption-based Keyword Search Mechanism (HEKSM)** project. It includes:

- Preprocessing and keyword extraction
- Plaintext and encrypted keyword search implementations
- Performance benchmarking and evaluation

---

## Structure Overview

```
scripts/
├── analysis/ # Evaluation scripts (accuracy, memory, plots)
│ ├── precision_and_recall.py
│ ├── measure_search_memory.sh
│ ├── plaintext_memory_usage.sh
│ └── plot_metrics.py
│
├── plaintext-scripts/ # Plaintext search (Python baseline)
│ ├── run_plaintext_searches.py
│ ├── keyword_search_1.py
│ └── keyword_search_2.py
│
├── HE-scripts/ # Homomorphic encryption & search (C++)
│ ├── new_encryption.cpp
│ ├── new_search.cpp
│ ├── run_encrypted_searches.py
│ └── seal/ # Microsoft SEAL headers (if included)
│
├── splits/ # Dataset preparation and keyword generation
│ ├── clean_n_split_1.py
│ └── top_keywords.py

```

---

## Usage Guide

> Make sure dependencies are installed via `install_all.sh` before running these scripts.

---

### 1. Preprocessing

Prepare and clean the dataset before encryption:

```
python3 scripts/splits/clean_n_split_1.py
python3 scripts/splits/top_keywords.py
```

### 2. Encryption (C++)

Compile and run encryption logic:

```
cd HE-scripts
mkdir -p build && cd build
cmake ..
make
./new_encryption
```

### 3. Encrypted Search

Single keyword:

```
./new_search
```

Batch search:

```
python3 scripts/HE-scripts/run_encrypted_searches.py
```

### 4. Plaintext Search

Baseline comparison:

```
python3 scripts/plaintext-scripts/run_plaintext_searches.py
```

### 5. Evaluation

Measure search accuracy and memory performance:

```
cd scripts/analysis

# Accuracy
python3 precision_and_recall.py

# Memory benchmarking
bash measure_search_memory.sh
bash plaintext_memory_usage.sh

# Optional visualizations
python3 plot_metrics.py

```

## Notes

* Python scripts expect the dataset under `datasets/cleaned/` and keywords in `top_keywords.json`
* Encrypted search reads from `datasets/encrypted/indexed_encrypted_emails.json`
* Results are saved under `analysis/`

