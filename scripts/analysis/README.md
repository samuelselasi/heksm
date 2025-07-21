# Analysis Scripts 

This directory contains scripts for evaluating the accuracy of the homomorphic encryption (HE)-based keyword search implementation against a plaintext baseline.

It compares search results from two phases:
- **Plaintext Search**: The expected correct matches
- **Encrypted Search**: Matches returned by the HE-based system

---

## Files in this Directory

```
scripts/analysis/
│
├── precision_and_recall.py         # Computes and prints precision/recall per keyword
├── plaintext_results.json          # Output from the plaintext search phase
├── encrypted_results.json          # Output from the encrypted search phase
├── precision_recall_plot.png       # Bar chart showing precision and recall for each keyword
└── README.md                       # This file
```

## Precision and Recall Evaluation


---

## What It Does

The main script `precision_and_recall.py`:
- Loads results from both plaintext and encrypted searches
- Calculates:
  - **True Positives (TP)**: Matches found by both systems
  - **False Positives (FP)**: Found only by encrypted system
  - **False Negatives (FN)**: Missed by encrypted system
  - **Precision** = TP / (TP + FP)
  - **Recall** = TP / (TP + FN)
- Displays a table in the console
- Saves a bar chart as `precision_recall_plot.png`

---

## To Run

First install dependencies if needed:

```bash
pip install pandas matplotlib
```

Then run the script:

```bash
python3 precision_and_recall.py
```

## Output

```
python3 precision_and_recall.py 

Precision and Recall Table:
 keyword  true_positives  false_positives  false_negatives  precision  recall  plaintext_matches  encrypted_matches
 meeting              12                0                0      100.0   100.0                 12                 12
     gas              17                0                0      100.0   100.0                 17                 17
 project              11                0                0      100.0   100.0                 11                 11
    plan              16                0                0      100.0   100.0                 16                 16
position               5                0                0      100.0   100.0                  5                  5
   check               4                0                0      100.0   100.0                  4                  4
   phone              11                0                0      100.0   100.0                 11                 11
    list               9                0                0      100.0   100.0                  9                  9
    deal              11                0                0      100.0   100.0                 11                 11
   shoot               1                0                0      100.0   100.0                  1                  1

Plot saved as: precision_recall_plot.png
```
<img width="1200" height="600" alt="precision_recall_plot" src="https://github.com/user-attachments/assets/5a7b07f3-8953-40e7-9dc9-d9cda18fff9f" />



---

## Sample Use Case

This analysis helps verify whether the encrypted search system:
- Accurately matches expected email files
- Preserves search quality (measured via recall)
- Avoids overmatching (verified by 100% precision)

This phase supports the evaluation criteria from your thesis on:
**"Securing Third-Party Data in Forensic Investigations Using Homomorphic Encryption."**
