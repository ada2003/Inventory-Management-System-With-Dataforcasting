const mongoose = require('mongoose');

// Define Product schema
const productSchema = new mongoose.Schema({
  productName: String,
  productImage: String,
  productQuantity: Number,
  productDescription: String, // Add product description field
  productPrice: Number
});

// Create Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
