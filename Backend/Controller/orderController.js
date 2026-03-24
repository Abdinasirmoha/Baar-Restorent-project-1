const Order = require("../model/Order");
const Food = require("../model/Food");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { items, address } = req.body;

    let orderItems = [];
    let total = 0;

    for (let item of items) {
      const food = await Food.findById(item.foodId);

      if (!food) {
        return res.status(404).json({ message: "Food not found" });
      }

      const newItem = {
        foodId: food._id,
        name: food.name,
        price: food.price,
        quantity: item.quantity,
      };

      orderItems.push(newItem);

      total += food.price * item.quantity;
    }

    const order = new Order({
      items: orderItems,
      total,
      address,
    });

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ALL ORDERS
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET SINGLE ORDER
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE STATUS
exports.updateStatus = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE ORDER
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};