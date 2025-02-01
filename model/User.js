// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   fname: { type: String, required: true },
//   lname: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   // image: { type: String, default: null },
//   isAdmin: { type: Boolean, default: false },
//   otp: { type: String },
//   otpExpiresAt: { type: Date },
//   isVerified: { type: Boolean, default: false }, // New field to track verification
//   resetToken: { type: String },
//   resetTokenExpiry: { type: Date },

// });

// const User = mongoose.model("User", UserSchema);
// export default User;

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default: null }, // Profile Image
  cover: { type: String, default: null }, // Cover Image
  bio: { type: String, default: "" }, // Bio field
  isAdmin: { type: Boolean, default: false },
  otp: { type: String },
  otpExpiresAt: { type: Date },
  isVerified: { type: Boolean, default: false },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
});

const User = mongoose.model("User", UserSchema);
export default User;

