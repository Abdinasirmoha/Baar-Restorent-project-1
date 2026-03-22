const express = require("express");
const router = express.Router();

const food=require("../Controller/Foodcontroller");
const uploadimage = require("../Middleware/uploadimage");  

router.post("/", uploadimage.single("image"), food.create);

module.exports = router;