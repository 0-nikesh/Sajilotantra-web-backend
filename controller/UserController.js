import User from "../model/User.js"; // Change require to import
import sendEmail from "../utils/emailSender.js";
import generateToken from "../utils/generateToken.js"; // Change require to import
import { hashPassword, matchPassword } from "../utils/hashPassword.js"; // Change require to import
import crypto from "crypto";
// Register User
const registerUser = async (req, res) => {
  const { fname, lname, email, password, isAdmin } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate OTP
    const otp = crypto.randomBytes(3).toString("hex").slice(0, 6); // Generates a 6-character OTP // Generate a 6-digit OTP
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    // Save the user temporarily with OTP and hashed password
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      fname,
      lname,
      email,
      password: hashedPassword,
      isAdmin,
      otp,
      otpExpiresAt,
    });

    // Send OTP to the user's email
    await sendEmail(
      email,
      "Your OTP for Registration",
      `Your OTP for registration is: ${otp}. It will expire in 10 minutes.`
    );

    res.status(201).json({
      message: "OTP sent to your email. Please verify your account.",
      userId: user._id, // Include the user ID for OTP verification
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//verify otp
const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the OTP matches and is not expired
    if (user.otp !== otp || user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // OTP is valid; clear the OTP fields
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    // Respond with a success message and token
    res.status(200).json({
      message: "Account verified successfully",
      token: generateToken(user._id), // Generate token for login
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check if user exists and the password matches
    if (user && (await matchPassword(password, user.password))) {
      res.json({
        token: generateToken(user._id, user.isAdmin), // Include isAdmin in the token
        user: {
          _id: user._id,
          email: user.email,
          isAdmin: user.isAdmin, // Include isAdmin field
        },
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" }); // Unauthorized
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" }); // Internal server error
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Admins can see all users
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) res.json(user);
  else res.status(404).json({ message: "User not found" });
};

// Delete User
const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (user) res.json({ message: "User deleted successfully" });
  else res.status(404).json({ message: "User not found" });
};

const getProfile = async (req, res) => {
  try {
    console.log("Authenticated User:", req.user); // Debug
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user profile", error: error.message });
  }
};

export { deleteUser, getAllUsers, getProfile, getUserById, loginUser, registerUser, verifyOtp }; // Change module.exports to export

