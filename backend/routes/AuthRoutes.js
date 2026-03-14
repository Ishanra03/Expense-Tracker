// const express = require("express");
// // const { protect } = require("/Middleware/authmiddleware.js");

// const {
//   registerUser,
//   loginUser,
//   getUserInfo,
// } = require("../Controllers/AuthController");

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/user", getUserInfo);

// module.exports = router;

//2

// const express = require("express");

// const {
//   registerUser,
//   loginUser,
//   getUserInfo,
// } = require("../Controllers/AuthController");

// const { protect } = require("../Middleware/authmiddleware");

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/user", protect, getUserInfo);

// module.exports = router;

const express = require("express");

const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../Controllers/AuthController");

const { protect } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {

  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded"
    });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  return res.status(200).json({
    imageUrl: imageUrl
  });

});



module.exports = router;