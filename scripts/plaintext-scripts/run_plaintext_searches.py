import subprocess
import json
import time

# Load keywords
with open("../splits/top_keywords.json") as f:
    keywords = json.load(f)

results = {}
summary = {}

print("Running plaintext keyword searches on first 60 emails...")

for kw in keywords:
    print(f"\nSearching for: {kw}")
    start = time.time()
    output = subprocess.check_output(["python3", "./keyword_search_2.py", kw], stderr=subprocess.STDOUT)
    end = time.time()

    output_str = output.decode("utf-8")
    matches = []

    # Extract file IDs from results
    for line in output_str.splitlines():
        if line.startswith("Line:") and "ID:" in line:
            try:
                file_id = line.split("ID:")[1].strip().split()[0]
                matches.append(file_id)
            except:
                continue

    summary[kw] = {
        "keyword": kw,
        "matches": len(matches),
        "time_sec": round(end - start, 4),
        "file_ids": sorted(matches)
    }

# Save result summary
with open("plaintext_results.json", "w") as f:
    json.dump(summary, f, indent=2)

print("\nAll searches completed.")
print("Results saved to: plaintext_results.json")
