const connecttomongo = require('./db');
const express = require('express');
const authRoutes = require('./routes/auth1');
const productRoutes =require('./routes/product')
const cors = require('cors');
const path = require('path');




const app = express();
const port = 4848;
app.use(cors());

// Connect to MongoDB
connecttomongo();

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});
// Serve static files (including JavaScript files)
// Serve static files (including JavaScript files)
app.use(express.static(path.join(__dirname, '../../frontend/beproject/build')));


app.get('/uploads/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  res.setHeader('Cache-Control', 'no-cache'); // Disable caching
  res.sendFile(filePath);
});
// Mount authRoutes under /api/auth
app.use('/auth', authRoutes);
app.use('/product', productRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
