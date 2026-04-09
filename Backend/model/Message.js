const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["UNREAD", "READ"],
        default: "UNREAD"
    }
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
