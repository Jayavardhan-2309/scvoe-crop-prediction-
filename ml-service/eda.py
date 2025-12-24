# ml-service/eda.py

import pandas as pd

# 👇 CHANGE THIS FILENAME ONLY IF NEEDED
DATA_PATH = "ml-service/data/raw/crop_data.csv"

def main():
    print("\n📂 Loading dataset...")
    df = pd.read_csv(DATA_PATH)

    print("\n✅ Dataset loaded successfully")

    # 1. Shape
    print("\n📐 Dataset Shape (rows, columns):")
    print(df.shape)

    # 2. Column names
    print("\n🧾 Column Names:")
    for col in df.columns:
        print(f"- {col}")

    # 3. Data types
    print("\n🔎 Data Types:")
    print(df.dtypes)

    # 4. Missing values
    print("\n❓ Missing Values Per Column:")
    print(df.isnull().sum())

    # 5. Target column guess (last column)
    target_col = df.columns[-1]
    print(f"\n🎯 Assumed Target Column: {target_col}")

    # 6. Unique target values
    print("\n🌾 Unique Crops & Counts:")
    print(df[target_col].value_counts())

    # 7. Basic statistics
    print("\n📊 Statistical Summary:")
    print(df.describe())

if __name__ == "__main__":
    main()
