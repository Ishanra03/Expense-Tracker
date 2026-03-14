// const User = require("../Models/user");
// const jwt = require("jsonwebtoken");

// // Generate JWT token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
// };

// // REGISTER USER
// exports.registerUser = async (req, res) => {
//   console.log("BODY RECEIVED:", req.body);

//   const { fullName, email, password, profileImageUrl } = req.body;

//   if (!fullName || !email || !password) {
//     return res.status(400).json({
//       message: "All fields are required",
//     });
//   }

//   try {
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({
//         message: "Email already in use",
//       });
//     }

//     const user = await User.create({
//       fullName,
//       email,
//       password,
//       profileImageUrl,
//     });

//     res.status(201).json({
//       id: user._id,
//       user,
//       token: generateToken(user._id),
//     });

//   } catch (err) {
//     res.status(500).json({
//       message: "Error registering user",
//       err: err.message,
//     });
//   }
// };

// // LOGIN USER
// exports.loginUser = async (req, res) => {
//   res.json({
//     message: "Login route working",
//   });
// };

// // GET USER INFO
// exports.getUserInfo = async (req, res) => {
//   res.json({
//     message: "User info route working",
//   });
// };

//2
const User = require("../Models/user");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};


// ================= REGISTER USER =================
exports.registerUser = async (req, res) => {

  const { fullName, email, password, profileImageUrl } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already in use",
      });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Error registering user",
      error: err.message,
    });

  }
};



// ================= LOGIN USER =================
exports.loginUser = async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    res.json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });

  } catch (err) {

    res.status(500).json({
      message: "Login error",
      error: err.message,
    });

  }
};



// ================= GET USER INFO =================
exports.getUserInfo = async (req, res) => {

  try {

    const user = await User.findById(req.user?.id).select("-password");

    if (!user) {
        return res.status(404).json({message: "User not found"});
    }

    res.status(200).json(user);

  } catch (err) {

    res.status(500).json({
      message: "Error fetching user",
      error: err.message,
    });

  }
};

// exports.getUserInfo = async (req, res) => {

//   try {

//     const user = await User.findById(req.user._id).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found"
//       });
//     }

//     res.json(user);

//   } catch (error) {

//     res.status(500).json({
//       message: "Server error"
//     });

//   }

