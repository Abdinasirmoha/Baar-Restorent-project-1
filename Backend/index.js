const express = require("express");
const mongoose = require("mongoose");

const app = express();

 
app.use(express.json());

 
const FoodRouter = require("./Router/Food");
app.use("/food", FoodRouter);
 
mongoose.connect("mongodb://localhost:27017/Restorent")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => console.log(err));

 
app.listen(5000, () => {
  console.log("Server running on port 5000");
});