// MainContent.js

import React, { useState, useEffect } from 'react';
import './MainContent.css'; // Import your CSS file for styling
import { FaTrash } from 'react-icons/fa'; // Import the delete button icon from react-icons

function MainContent() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchProducts();
  
  }, []);

  const fetchProducts = async() => {
    fetch('http://localhost:4848/product/fetchproduct')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setProducts(data);
        calculateTotals(data);
      })
      .catch(error => console.error('Error fetching products:', error));


   
  };
 
 
  const calculateTotals = (products) => {
    let totalQuantity = 0;
    let totalPrice = 0;

    products.forEach(product => {
      totalQuantity += product.productQuantity;
      totalPrice += product.productPrice;
    });

    setTotalProducts(totalQuantity);
    setTotalPrice(totalPrice);
  };

  const deleteProduct = async productId => {
    try {
      const response = await fetch(`http://localhost:4848/product/delete/${productId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchProducts(); // Fetch products again to update the list
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="main-content">
      <div className="cards-container">
        <div className="card">
          <h3>Total Number of Products</h3>
          <p>{totalProducts}</p>
        </div>
        <div className="card">
          <h3>Total Store Value</h3>
          <p>{totalPrice}Rs</p>
        </div>
        <div className="card">
          <h3>Out of Stock</h3>
          <p>411</p> {/* Placeholder value, update it with the actual count */}
        </div>
      </div>
      <div className="product-list-container">
        <h2>Product List</h2>
        <div className="product-list">
          <ul>
            {products.map(product => (
              <li key={product._id}>
                <p>{product.productName}</p>
                <p>Quantity: {product.productQuantity}</p>
                <p>Price: {product.productPrice}Rs</p>
                <button className="delete-button" onClick={() => deleteProduct(product._id)}>
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
