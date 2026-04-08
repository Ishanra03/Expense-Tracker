
const User = require("../Models/user");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};


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
      age: user.age,
      gender: user.gender,
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
      age: user.age,
      gender: user.gender,
      token: generateToken(user._id),
    });

  } catch (err) {

    res.status(500).json({
      message: "Login error",
      error: err.message,
    });

  }
};



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

exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user?.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { fullName, email, password, profileImageUrl, age, gender } = req.body;

    if (typeof fullName === "string" && fullName.trim()) {
      user.fullName = fullName.trim();
    }

    if (typeof email === "string" && email.trim()) {
      user.email = email.trim().toLowerCase();
    }

    if (typeof password === "string" && password.trim()) {
      user.password = password.trim();
    }

    if (profileImageUrl !== undefined) {
      user.profileImageUrl = profileImageUrl || null;
    }

    if (age !== undefined) {
      user.age = age === "" || age === null ? null : Number(age);
    }

    if (gender !== undefined) {
      user.gender = gender || "";
    }

    const updatedUser = await user.save();

    res.status(200).json({
      id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      profileImageUrl: updatedUser.profileImageUrl,
      age: updatedUser.age,
      gender: updatedUser.gender,
    });
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(400).json({
        message: "Email already in use",
      });
    }

    res.status(500).json({
      message: "Error updating user profile",
      error: err.message,
    });
  }
};


