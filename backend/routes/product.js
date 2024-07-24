// product.js

const express = require('express');
const router = express.Router();
const Product = require('../module/Product'); // Import the Product model
const multer = require('multer');
// Multer configuration
const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files

// Endpoint to add a new product
// Endpoint to add a new product
router.post('/addproduct', upload.single('productImage'), async (req, res) => {
  try {
    const { productName, productQuantity, productPrice, productDescription } = req.body;
    const productImage = req.file.path; // Multer saves file path in req.file.path

    // Create new product instance
    const newProduct = new Product({
      productName,
      productImage,
      productQuantity,
      productDescription, // Include product description
      productPrice
    });

    // Save product to database
    await newProduct.save();
    res.status(201).send('Product added successfully');
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Failed to add product');
  }
});


router.get('/fetchproduct', async (req, res) => {
  try {
    const products = await Product.find();
    // Update productImage URLs to use forward slashes and serve from backend
    const updatedProducts = products.map(product => ({
      ...product.toObject(),
      productImage: `http://localhost:4848/${product.productImage.replace(/\\/g, '/')}` // Assuming productImage contains the file path
    }));
    res.json(updatedProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});







router.delete('/delete/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});



module.exports = router;
