import json
import pandas as pd
import matplotlib.pyplot as plt

# Load result files
with open("../plaintext-scripts/plaintext_results.json") as f1, open("../HE-scripts/encrypted_results.json") as f2:
    plain_results = json.load(f1)
    encrypted_results = json.load(f2)

# Compute metrics
metrics = []

for keyword in plain_results:
    plain_ids = set(plain_results[keyword]["file_ids"])
    encrypted_ids = set(encrypted_results.get(keyword, {}).get("file_ids", []))

    tp = len(plain_ids & encrypted_ids)
    fp = len(encrypted_ids - plain_ids)
    fn = len(plain_ids - encrypted_ids)

    precision = tp / (tp + fp) if (tp + fp) else 0
    recall = tp / (tp + fn) if (tp + fn) else 0

    metrics.append({
        "keyword": keyword,
        "true_positives": tp,
        "false_positives": fp,
        "false_negatives": fn,
        "precision": round(precision * 100, 2),
        "recall": round(recall * 100, 2),
        "plaintext_matches": len(plain_ids),
        "encrypted_matches": len(encrypted_ids)
    })

# Convert to DataFrame
df = pd.DataFrame(metrics)

# Print table to console
print("\nPrecision and Recall Table:")
print(df.to_string(index=False))

# Plot results
plt.figure(figsize=(12, 6))
plt.bar(df["keyword"], df["precision"], alpha=0.7, label="Precision (%)")
plt.bar(df["keyword"], df["recall"], alpha=0.7, label="Recall (%)")
plt.title("Precision and Recall per Keyword")
plt.xlabel("Keyword")
plt.ylabel("Percentage")
plt.xticks(rotation=45)
plt.ylim(0, 105)
plt.legend()
plt.tight_layout()
plt.grid(axis='y')

# Save the plot
plt.savefig("precision_recall_plot.png")
print("\nPlot saved as: precision_recall_plot.png")
