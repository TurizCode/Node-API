const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const router = express.Router();

// create a new product
router.post("/", createProduct);

// get all products
router.get("/", getProducts);

// get a single product
router.get("/:id", getProductById);

// update a product
router.put("/:id", updateProduct);

// delete a product
router.delete("/:id", deleteProduct);

module.exports = router;
