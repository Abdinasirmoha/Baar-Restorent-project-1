const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./model/Admin");

mongoose.connect("mongodb://localhost:27017/Restorent").then(async () => {
  console.log("Connected to MongoDB");
  const email = "admin@baar.com";
  const password = "password123";

  let admin = await Admin.findOne({ email });
  if (!admin) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    admin = new Admin({ email, password: hashedPassword });
    await admin.save();
    console.log("Admin seeded successfully!");
  } else {
    // Force update password just in case
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);
    await admin.save();
    console.log("Admin updated successfully!");
  }
  process.exit(0);
}).catch(err => {
  console.error("Error connecting to DB", err);
  process.exit(1);
});
