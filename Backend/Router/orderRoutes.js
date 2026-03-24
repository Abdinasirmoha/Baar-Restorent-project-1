const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  getOrder,
  updateStatus,
  deleteOrder,
} = require("../Controller/orderController");

// CREATE ORDER
router.post("/", createOrder);

// GET ALL ORDERS
router.get("/", getOrders);

// GET SINGLE ORDER
router.get("/:id", getOrder);

// UPDATE STATUS
router.put("/:id", updateStatus);

// DELETE ORDER
router.delete("/:id", deleteOrder);

module.exports = router;