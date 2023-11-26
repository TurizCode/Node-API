const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// Create a product
const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500);
    throw new Error(error.message);
    // res.status(500).json({ message: error.message });
  }
});

// Get all the product
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
    // res.status(500).json({ message: error.message });
  }
};

// Get a single product by id
const getProductById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
    // res.status(500).json({ message: error.message });
  }
});

// Update a product by id
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    // if it cannot find the product in database
    if (!product) {
      res.status(404);
      throw new Error(`Product with id ${id} not found`);
      //   return res
      //     .status(404)
      //     .json({ message: `Product with id ${id} not found` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
    // res.status(500).json({ message: error.message });
  }
});

// Delete a product by id
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404);
      throw new Error(`Product with id ${id} not found`);
      //   return res
      //     .status(404)
      //     .json({ message: `Product with id ${id} not found` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
    // res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
