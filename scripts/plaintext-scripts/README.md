# Plaintext Keyword Search - Phase 1

This directory contains Python scripts used in **Phase 1** of the thesis project titled:

> **"Securing Third-Party Data in Forensic Investigations Using Homomorphic Encryption"**

This phase establishes the **baseline performance and accuracy of keyword search on plaintext email data**, which will later be compared with encrypted search results.

---

## Directory Contents

```
plaintext-scripts/
│
├── keyword_search_2.py          # Vectorized plaintext search using pandas
├── extract_top_keywords.py      # Automatically selects 10 relevant keywords from first 60 emails
├── run_plaintext_searches.py    # Performs searches for those keywords and saves output
├── top_keywords.json            # (Generated) Contains the top 10 keyword list
├── plaintext_results.json       # (Generated) Search results from plaintext phase
└── README.md                    # This file
```

---

## Workflow Overview

This phase includes the following steps:

### 🔹 1. Automatically Extract Forensically Relevant Keywords

The script `extract_top_keywords.py` processes the first 60 emails and saves a refined list of 10 domain-relevant keywords (e.g., "confidential", "urgent", "report", etc.) to:

```
top_keywords.json
```

To run:

```bash
python3 extract_top_keywords.py
```

---

### 🔹 2. Run Plaintext Search for Each Keyword

The script `run_plaintext_searches.py`:

- Loads keywords from `top_keywords.json`
- Searches the plaintext dataset for each keyword
- Captures matched file IDs and runtime for each
- Saves everything in:

```
plaintext_results.json
```

To run:

```bash
python3 run_plaintext_searches.py
```

---

## Dataset

Scripts operate on:

```
../../datasets/cleaned/split-1.csv
```

Ensure this file is cleaned, comma-separated, and includes columns:

- `email_id`
- `subject`
- `body`
- `message` (optional combined text)

Only the first 60 emails are used in this phase for simulation consistency.

---

## Purpose of This Phase

This plaintext search phase is critical for:

- Establishing a **baseline** for precision, recall, and search speed
- Capturing **email exposure risk** during unprotected searches
- Providing comparison for the **homomorphic encrypted search** in later phases

---

## Requirements

- Python 3.x
- Required packages:

```bash
pip install pandas scikit-learn
```
