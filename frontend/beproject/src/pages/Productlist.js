import React, { useEffect, useState } from 'react';
import Sidebar from '../compo/Sidebar';
import './Productlist.css'; // Assuming your CSS file is named Productlist.css

export default function Productlist() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4848/product/fetchproduct')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="product-list-page">
      <Sidebar />
      <div className="product-list">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.productImage} alt={product.productName} />
            <div className="product-info">
              <h3>{product.productName}</h3>
              <p>Quantity: {product.productQuantity}</p>
              <p>Price: ${product.productPrice}</p>
              <p>Description: {product.productDescription}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
