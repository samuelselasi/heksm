
import subprocess
import json
import time

# Load the 10 keywords
with open("../../scripts/splits/top_keywords.json") as f:
    keywords = json.load(f)

results = {}

print("Running encrypted keyword searches on indexed_encrypted_emails.json...")

for kw in keywords:
    print(f"\nSearching for: {kw}")
    start = time.time()
    try:
        output = subprocess.check_output(["./search_single_keyword", kw], stderr=subprocess.STDOUT)
        end = time.time()
    except subprocess.CalledProcessError as e:
        print(f"Error while searching for '{kw}':", e.output.decode())
        continue

    output_str = output.decode("utf-8")
    file_ids = []
    for line in output_str.splitlines():
        if line.startswith("ID:"):
            file_id = line.split("ID:")[1].strip()
            file_ids.append(file_id)

    results[kw] = {
        "keyword": kw,
        "matches": len(file_ids),
        "time_sec": round(end - start, 4),
        "file_ids": sorted(file_ids)
    }

# Save to JSON
with open("encrypted_results.json", "w") as f:
    json.dump(results, f, indent=2)

print("\nEncrypted search results saved to encrypted_results.json")
