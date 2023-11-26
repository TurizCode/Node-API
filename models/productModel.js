const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: (true, "Enter a product name"),
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true, //useed to track when did the data got created or modified
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
