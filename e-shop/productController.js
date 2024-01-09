const Product = require('./productModel');

const productController = {
    createProduct: async (req, res) => {
        try {
          const { name, price, description } = req.body;
          console.log('Received data:', { name, price, description });
      
          const product = new Product({ name, price, description });
          await product.save();
          res.status(201).json({ message: 'Product created successfully', product });
        } catch (err) {
          console.error('Error creating product:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },

  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      console.log('Fetched products:', products);
      res.json(products);
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  

  getProductById: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      console.error('Error fetching product:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const { name, price, description } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { name, price, description },
        { new: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (err) {
      console.error('Error updating product:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (err) {
      console.error('Error deleting product:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = productController;
