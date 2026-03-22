const modelschuma = require("../model/Food");

const create = async (req, res) => {
  try {
    const newitem = await modelschuma.create({
      name: req.body.name,
      price: req.body.price,
      image: req.file ? req.file.filename : "", // ✅ FIX
      category: req.body.category
    });

    res.status(201).json(newitem);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

module.exports = { create };