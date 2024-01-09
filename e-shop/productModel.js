const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
});

const Product = mongoose.model('Product', productSchema, 'Product');

module.exports = Product;
