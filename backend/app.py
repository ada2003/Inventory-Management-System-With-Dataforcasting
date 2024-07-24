from flask import Flask, jsonify
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from flask_cors import CORS  # Import the CORS module

app = Flask(__name__)
CORS(app)

# Load the dataset
data = pd.read_csv('Dataset1.csv')

# Encode the product_name column
label_encoder = LabelEncoder()
data['product_name_encoded'] = label_encoder.fit_transform(data['product_name'])

# Split the data into features and target variables
features = data.drop(['Sales_of_Month 1', 'Sales_of_Month 2', 'Sales_of_Month 3', 'product_name'], axis=1)
target_sales_1 = data['Sales_of_Month 1']
target_sales_2 = data['Sales_of_Month 2']
target_sales_3 = data['Sales_of_Month 3']

# Train the Random Forest Regressor models
rf_sales_1 = RandomForestRegressor(n_estimators=100, random_state=42)
rf_sales_1.fit(features, target_sales_1)
rf_sales_2 = RandomForestRegressor(n_estimators=100, random_state=42)
rf_sales_2.fit(features, target_sales_2)
rf_sales_3 = RandomForestRegressor(n_estimators=100, random_state=42)
rf_sales_3.fit(features, target_sales_3)
@app.route('/future-data')
def future_data():
    # Predict future sales for the next 3 months
    future_sales_1 = rf_sales_1.predict(features)
    future_sales_2 = rf_sales_2.predict(features)
    future_sales_3 = rf_sales_3.predict(features)

    # Calculate future inventory needs
    current_inventory = data['Current_Inventory_Level'].values
    future_inventory = current_inventory[:, None] + future_sales_1[:, None] + future_sales_2[:, None] + future_sales_3[:, None]

    # Prepare data for JSON response
    product_data = []
    for i, (product, inventory_need) in enumerate(zip(data['product_name'], future_inventory[:, 0])):
        product_data.append({
            'product': product,
            'future_sales': float(future_sales_1[i] + future_sales_2[i] + future_sales_3[i]),
            'future_inventory_need': int(inventory_need)
        })

    return jsonify(product_data)
if __name__ == '__main__':
    app.run(debug=True)
