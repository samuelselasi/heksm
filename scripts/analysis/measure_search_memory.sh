#!/bin/bash

echo "Keyword,Memory_MB" > search_memory_usage.csv

for keyword in $(cat top_keywords.json | jq -r '.[]'); do
    echo "Testing: $keyword"
    mem_kb=$( (/usr/bin/time -v ../HE-scripts/search_single_keyword "$keyword") 2>&1 | grep "Maximum resident set size" | awk '{print $6}' )
    mem_mb=$((mem_kb / 1024))
    echo "$keyword,$mem_mb" >> search_memory_usage.csv
done

echo "✅ Done. Output: search_memory_usage.csv"
