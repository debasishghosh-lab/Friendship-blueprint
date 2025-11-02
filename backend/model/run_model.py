# -*- coding: utf-8 -*-
import pandas as pd
import numpy as np
from sklearn.preprocessing import MultiLabelBinarizer, MinMaxScaler
from sklearn.cluster import AgglomerativeClustering
import joblib
import sys
import json
import os
import warnings

warnings.filterwarnings("ignore")

# -------- Handle Command-line Input (uploaded file path) --------
if len(sys.argv) > 1:
    file_path = sys.argv[1]
else:
    file_path = "MiniProject.csv"  # fallback

# ✅ Ensure absolute path works no matter where it's called from
base_dir = os.path.dirname(os.path.abspath(__file__))        # backend/model/
abs_path = os.path.join(os.path.dirname(base_dir), file_path)  # backend/

# -------- Load Data --------
try:
    if abs_path.endswith(".csv"):
        df = pd.read_csv(abs_path)
    else:
        df = pd.read_excel(abs_path)
except Exception as e:
    print(json.dumps({"error": f"Failed to read file: {str(e)}"}))
    sys.exit(1)

# -------- Clean Column Names --------
df.columns = (
    df.columns.str.strip()
              .str.lower()
              .str.replace(' ', '_')
              .str.replace('[^0-9a-zA-Z_]', '', regex=True)
)

# -------- Handle Name Column --------
if 'name' not in df.columns:
    df['name'] = [f"Person_{i+1}" for i in range(len(df))]

# -------- Rename Columns --------
df = df.rename(columns={
    'teamwork_preference____like__1prefer_solo_5prefer_teams': 'teamwork_preference',
    'club_top_2': 'club_top2'
})

# -------- Select Relevant Columns --------
required_cols = ['club_top1', 'club_top2', 'hobby_top1', 'hobby_top2', 'teamwork_preference']
df = df[[col for col in required_cols if col in df.columns] + ['name']]

# -------- Clean String Columns --------
def clean(data):
    if pd.isnull(data):
        return None
    return str(data).strip().lower()

for col in ['club_top1', 'club_top2', 'hobby_top1', 'hobby_top2']:
    if col in df.columns:
        df[col] = df[col].apply(clean)

# -------- Combine All Interests --------
def make_interests(row):
    items = [row.get('club_top1'), row.get('club_top2'),
             row.get('hobby_top1'), row.get('hobby_top2')]
    items = [x for x in items if x is not None]
    return list(dict.fromkeys(items))  # remove duplicates

df['interests'] = df.apply(make_interests, axis=1)

# -------- Binarize + Scale --------
mlb = MultiLabelBinarizer()
interest_matrix = mlb.fit_transform(df['interests'])
scaler = MinMaxScaler()
teamwork_scaled = scaler.fit_transform(df[['teamwork_preference']])

final_features = np.hstack([interest_matrix, teamwork_scaled])

# -------- Final Model (Fixed k=5 for consistency) --------
clustering = AgglomerativeClustering(n_clusters=5, linkage='ward')
df['cluster'] = clustering.fit_predict(final_features)

# -------- Save Model Components --------
joblib.dump(clustering, os.path.join(base_dir, "model.pkl"))
joblib.dump(mlb, os.path.join(base_dir, "mlb.pkl"))
joblib.dump(scaler, os.path.join(base_dir, "scaler.pkl"))

# -------- Prepare Results --------
clusters_summary = (
    df.groupby('cluster')['name']
      .apply(list)
      .reset_index()
      .to_dict(orient='records')
)

result = {
    "status": "success",
    "num_clusters": len(clusters_summary),
    "clusters": clusters_summary,
}

# -------- Output JSON to stdout --------
print(json.dumps(result))
sys.exit(0)
