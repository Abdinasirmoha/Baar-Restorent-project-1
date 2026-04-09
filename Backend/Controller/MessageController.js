const Message = require('../model/Message');

const createMessage = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        const newMessage = new Message({ name, email, phone, message });
        await newMessage.save();
        res.status(201).json({ message: "Message sent successfully", data: newMessage });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = {
    createMessage,
    getMessages
};
