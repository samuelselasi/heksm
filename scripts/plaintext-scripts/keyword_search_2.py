import pandas as pd
import sys
import time
import re

# -----------------------------
# Step 1: Handle CLI argument
# -----------------------------
if len(sys.argv) < 2:
    print("Please provide a keyword to search.")
    print("Usage: python3 keyword_search_1.py confidential")
    sys.exit(1)

search_term = sys.argv[1].lower()
print(f"Searching for keyword: '{search_term}'\n")

# -----------------------------
# Step 2: Load dataset
# -----------------------------
df = pd.read_csv("../../datasets/cleaned/split-1.csv", nrows=60)

# -----------------------------
# Step 3: Token-based exact search
# -----------------------------
start_time = time.time()

# Combine subject and body only (message column does not exist)
df["combined"] = (df["subject"].fillna("") + " " + df["body"].fillna("")).str.lower()

# Tokenize using regex
df["tokens"] = df["combined"].apply(lambda text: re.findall(r'\b\w+\b', text))

# Filter for exact matches
results = df[df["tokens"].apply(lambda words: search_term in words)]

elapsed_time = time.time() - start_time

# -----------------------------
# Step 4: Output Results
# -----------------------------
if results.empty:
    print("No matches found.")
else:
    print(f"{len(results)} match(es) found in {elapsed_time:.4f} seconds.\n")
    for i, row in results.iterrows():
        print(f"Line: {i + 2} | ID: {row.get('email_id', 'unknown')}")
        print(f"Date: {row.get('date', 'N/A')}")
        print(f"Subject: {row.get('subject', '')}")
        print(f"Body: {row.get('body', '')}\n")
        print("=" * 90 + "\n")
