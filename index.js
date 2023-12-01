require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL; // Importing the mongodb url
const FRONTEND = process.env.FRONTEND; // Importing the url domain for origin variable

const corsOptions = {
  origin: [
    FRONTEND,
    "http://localhost:5173",
    "https://react-crud-ruby.vercel.app",
  ], // give access to this specific domain
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// to enable cors
app.use(cors(corsOptions));
// to enable input from <json> to create/ update a product on insomnia
app.use(express.json());
// to enable input from <urlform> to update a product on insomnia
app.use(express.urlencoded({ extended: false }));

// product routes
app.use("/api/products", productRoute);

// page routes
app.get("/", (req, res) => {
  res.send("Hello NODE API");
});
app.get("/blog", (req, res) => {
  res.send("Hello Blog, my name is Rizki :D ");
});

app.use(errorMiddleware);

// why do we use strictQuery = false ? (find it on Google or YOuTube Tutorial that you followed)
// because we don't want to use deprecated methods (actually this is not an answer)
mongoose.set("strictQuery", false);
// connect to mongodb
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`NODE API app is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
