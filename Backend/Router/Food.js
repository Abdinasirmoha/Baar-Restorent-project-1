const express = require("express");
const router = express.Router();

const food=require("../Controller/Foodcontroller");
const uploadimage = require("../Middleware/uploadimage");  

router.post("/", uploadimage.single("image"), food.create);
router.get("/", food.getAll);
router.get("/:id",food.getbyid);
router.delete("/:id", food.Deleteuser)
router.put("/:id", uploadimage.single("image"), food.Updatefoodt);

module.exports = router;