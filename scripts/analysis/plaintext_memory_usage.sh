#!/bin/bash

echo "Keyword,Memory_MB" > plaintext_memory_usage.csv

for keyword in $(jq -r '.[]' ../splits/top_keywords.json); do
    echo "Testing: $keyword"
    mem_kb=$(
        (/usr/bin/time -v python3 ./keyword_search_2.py "$keyword") 2>&1 \
        | grep "Maximum resident set size" | awk '{print $6}'
    )
    mem_mb=$((mem_kb / 1024))
    echo "$keyword,$mem_mb" >> plaintext_memory_usage.csv
done

echo "✅ Done. Output: plaintext_memory_usage.csv"
