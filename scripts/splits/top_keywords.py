import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
import json
import re

# Load data
df = pd.read_csv("../../datasets/cleaned/cleaned_split-1.csv").head(60)
text_cols = ['subject', 'body', 'message']
df['combined'] = df[text_cols].fillna('').agg(' '.join, axis=1)

# Clean text
df['combined'] = df['combined'].str.lower()
df['combined'] = df['combined'].apply(lambda x: re.sub(r'[^a-zA-Z\s]', '', x))

# Extend stopwords with names/domains/noise
custom_stopwords = set([
    'ect', 'enron', 'hou', 'com', 'phillip', 'allen', 'vince', 'louise', 'jones',
    'subject', 'email', 'forwarded', 'message', 'sent', 'received', 'http', 'mime',
    'version', 'corp', 'na', 'pm', 'am', 'mimeversion', 'san'
])

# TF-IDF
vectorizer = TfidfVectorizer(
    stop_words='english',
    max_features=1000,
    token_pattern=r'\b[a-z]{3,}\b'  # only words with 3+ letters
)
X = vectorizer.fit_transform(df['combined'])
tfidf_scores = X.toarray().sum(axis=0)
terms = vectorizer.get_feature_names_out()

# Filter out custom stopwords
filtered_terms = [(term, score) for term, score in zip(terms, tfidf_scores) if term not in custom_stopwords]
filtered_terms.sort(key=lambda x: x[1], reverse=True)

# Pick top 10
top_keywords = [term for term, _ in filtered_terms[:10]]

# Save
with open("top_keywords.json", "w") as f:
    json.dump(top_keywords, f, indent=2)

print("Top 10 refined keywords saved to top_keywords.json:")
for kw in top_keywords:
    print("-", kw)
