'''
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
import matplotlib.pyplot as plt

# Read data from CSV file or any source


df = pd.read_csv('inventory_data.csv')

# Calculate average monthly sales
df['Average_Sales'] = df[['month_1', 'month_2', 'month_3']].mean(axis=1)

# Estimate total sales for the next restocking period (assuming 3 months)
df['Total_Sales_Next_Period'] = df['Average_Sales'] * 3

# Calculate stock to be purchased
df['Stock_To_Be_Purchased'] = df['Total_Sales_Next_Period'] - df['Previous_Stock']

# Display the results
print(df[['Product_Name', 'Stock_To_Be_Purchased']])

df_positive_stock = df[df['Stock_To_Be_Purchased'] > 0]

# Display the results
print(df_positive_stock[['Product_Name', 'Stock_To_Be_Purchased']])

#################################################
# Forecasting
def forecast_stock(stock):
    model = ARIMA([stock], order=(1, 1, 1))  # Convert stock to a list
    model_fit = model.fit()
    forecast = model_fit.forecast(steps=1)[0]
    return forecast

# Forecast next month's stock for each product
df_positive_stock['Forecasted_Stock'] = df_positive_stock['Stock_To_Be_Purchased'].apply(lambda x: forecast_stock(x))


# Plotting
plt.figure(figsize=(12, 6))

# Plot bar graph for Stock_To_Be_Purchased
plt.subplot(1, 2, 1)
plt.bar(df_positive_stock['Product_Name'], df_positive_stock['Stock_To_Be_Purchased'], color='skyblue')
plt.xlabel('Product')
plt.ylabel('Stock To Be Purchased')
plt.title('Stock To Be Purchased for Products')
plt.xticks(rotation=45, ha='right')

# Plot line graph for Forecasted_Stock
plt.subplot(1, 2, 2)
plt.plot(df_positive_stock['Product_Name'], df_positive_stock['Forecasted_Stock'], marker='o', color='b', label='Forecasted Stock')
plt.xlabel('Product')
plt.ylabel('Forecasted Stock')
plt.title('Forecasted Stock for Products')
plt.xticks(rotation=45, ha='right')
plt.legend()

plt.tight_layout()
plt.show()

# Define the number of top products to display in the pie chart
top_n = 5  # Change this number to adjust the number of top products to display

# Sort the DataFrame by 'Stock_To_Be_Purchased' in descending order
df_sorted = df_positive_stock.sort_values(by='Stock_To_Be_Purchased', ascending=False)

# Select the top N products
top_products = df_sorted.head(top_n)

# Plot pie chart for the distribution of stock to be purchased for the top N products
plt.figure(figsize=(8, 8))
plt.pie(top_products['Stock_To_Be_Purchased'], labels=top_products['Product_Name'], autopct='%1.1f%%', startangle=140)
plt.title(f'Distribution of Stock To Be Purchased for Top {top_n} Products')
plt.show()


'''
# code creating flask backend api
'''
# backend.py
from flask import Flask, jsonify, request

from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS) to allow requests from React frontend

# Read data from CSV file or any source


df = pd.read_csv('./inventory_data.csv')

# Calculate average monthly sales
df['Average_Sales'] = df[['month_1', 'month_2', 'month_3']].mean(axis=1)

# Estimate total sales for the next restocking period (assuming 3 months)
df['Total_Sales_Next_Period'] = df['Average_Sales'] * 3

# Calculate stock to be purchased
df['Stock_To_Be_Purchased'] = df['Total_Sales_Next_Period'] - df['Previous_Stock']

@app.route('/api/stock-data')
def get_stock_data():
    print(request.path)
    # Filter out negative stock to be purchased values
    df_positive_stock = df[df['Stock_To_Be_Purchased'] > 0]
    
    # Forecasting
    def forecast_stock(stock):
        model = ARIMA([stock], order=(1, 1, 1))  # Convert stock to a list
        model_fit = model.fit()
        forecast = model_fit.forecast(steps=1)[0]
        return forecast
    
    # Forecast next month's stock for each product
    df_positive_stock['Forecasted_Stock'] = df_positive_stock['Stock_To_Be_Purchased'].apply(forecast_stock)
    
    # Prepare data for API response
    data = df_positive_stock[['Product_Name', 'Stock_To_Be_Purchased', 'Forecasted_Stock']].to_dict(orient='records')
    return jsonify(data)

@app.route('/api/pie-chart-data')
def get_pie_chart_data():
    # Filter out negative stock to be purchased values
    df_positive_stock = df[df['Stock_To_Be_Purchased'] > 0]

    # Select the top 5 products
    top_n = 5
    df_sorted = df_positive_stock.sort_values(by='Stock_To_Be_Purchased', ascending=False)
    top_products = df_sorted.head(top_n)

    # Prepare data for pie chart
    pie_chart_data = {
        'labels': top_products['Product_Name'].tolist(),
        'data': top_products['Stock_To_Be_Purchased'].tolist()
    }

    return jsonify(pie_chart_data)

if __name__ == '__main__':
    app.run(debug=True)




#code for creating dataset
'''
'''
import pandas as pd
import numpy as np

# Define the number of entries
num_entries = 250

# Generate random data for products
products = ['Product' + str(i) for i in range(num_entries)]

# Generate random data for previous stock
previous_stock = np.random.randint(10, 100, num_entries)

# Generate random data for monthly sales for the past 3 months
month_1_sales = np.random.randint(1, 30, num_entries)
month_2_sales = np.random.randint(1, 30, num_entries)
month_3_sales = np.random.randint(1, 30, num_entries)

# Create a DataFrame
data = {
    'Product_Name': products,
    'Previous_Stock': previous_stock,
    'month_1': month_1_sales,
    'month_2': month_2_sales,
    'month_3': month_3_sales
}

df = pd.DataFrame(data)

# Save DataFrame to CSV file
df.to_csv('inventory_data.csv', index=False)

print("CSV file generated successfully.")
'''
'''
