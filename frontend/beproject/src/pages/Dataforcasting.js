import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import Sidebar from '../compo/Sidebar'; // Import the Sidebar component
import './Dataforcasting.css';
const DataForecasting = () => {
    const [productData, setProductData] = useState([]);
    const [topInventoryProducts, setTopInventoryProducts] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/future-data');

      if (response.status === 200) {
        setProductData(response.data);
        findTopInventoryProducts(response.data);
        renderCharts(response.data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const findTopInventoryProducts = (data) => {
    // Sort the products by inventory requirement in descending order
    const sortedProducts = [...data].sort((a, b) => b.future_inventory_need - a.future_inventory_need);

    // Get the top 4 products with the highest inventory requirement
    const topProducts = sortedProducts.slice(0, 4);
    
    setTopInventoryProducts(topProducts);
  };
  const renderCharts = (data) => {
    const labels = data.map((product) => product.product);
    const salesData = data.map((product) => product.future_sales);
    const inventoryData = data.map((product) => product.future_inventory_need);

    // Render chart for future sales
    const salesChart = new Chart(document.getElementById('salesChart'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Future Sales',
          data: salesData,
          backgroundColor: 'rgba(199, 0, 57)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Render chart for future inventory need
    const inventoryChart = new Chart(document.getElementById('inventoryChart'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Future Inventory Need',
          data: inventoryData,
          backgroundColor: 'rgba(0, 46, 255)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: '20px' }}>
        <h1>Data Forecasting</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '45%' }}>
            <canvas id="salesChart" width="400" height="300"></canvas>
          </div>
          <div style={{ width: '45%', marginRight: '20px' }}>
            <canvas id="inventoryChart" width="400" height="300"></canvas>
          </div>
        </div>
        <div className="product-container"> {/* Add space below the graphs */}
        <h2>Top 4 Products with Maximum Inventory Requirement</h2>
        <div className="product-grid">
          {topInventoryProducts.map((product, index) => (
            <div key={index} className="product-item">
              <p className="product-name">Product Name: {product.product}</p>
              <p className="inventory-need">Required Inventory: {product.future_inventory_need}</p>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataForecasting;
