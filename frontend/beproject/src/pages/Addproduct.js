import React, { useState } from 'react';
import './addproduct.css';

export default function Addproduct() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productQuantity, setProductQuantity] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productDescription', productDescription); // Include product description
    formData.append('productImage', productImage);
    formData.append('productQuantity', productQuantity);
    formData.append('productPrice', productPrice);

    try {
      const response = await fetch('http://localhost:4848/product/addproduct', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('Product added successfully!');
        setProductName('');
        setProductDescription(''); // Clear product description
        setProductImage(null);
        setProductQuantity('');
        setProductPrice('');
        setError('');
      } else {
        setError('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
  };

  return (
    <div className="container">
      <h1>Add Product</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label>Product Description:</label>
          <input
            type="text"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label>Upload Product Image:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="file-upload"
            required
          />
        </div>
        <div className="form-group">
          <label>Product Quantity:</label>
          <input
            type="number"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label>Product Price:</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>
    </div>
  );
}
