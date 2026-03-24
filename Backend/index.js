const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

 app.use("/allimages", express.static("images"));
 
const FoodRouter = require("./Router/Food");
app.use("/orders", require("./Router/orderRoutes"));

app.use("/food", FoodRouter);
 
mongoose.connect("mongodb://localhost:27017/Restorent")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => console.log(err));

 
app.listen(5000, () => {
  console.log("Server running on port 5000");
});