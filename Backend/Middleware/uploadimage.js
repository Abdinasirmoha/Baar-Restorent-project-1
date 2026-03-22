const multer = require("multer");

const imagelocation = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const uploadimage = multer({ storage: imagelocation });

module.exports = uploadimage;
