import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  otp: { type: String }, // Temporary OTP for email verification
  otpExpiresAt: { type: Date }, // OTP expiration time
});

const User = mongoose.model('User', UserSchema);
export default User;
