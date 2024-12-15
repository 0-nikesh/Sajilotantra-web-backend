const User = require("../model/User");
const UserProfile = require("../model/UserProfile"); // Import UserProfile schema
const { hashPassword } = require("../utils/hashPassword");

// Get the profile of the authenticated user
const getUserProfile = async (req, res) => {
  try {
    // Find user and their profile details
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    const userProfile = await UserProfile.findOne({ user_id: req.user.id });

    if (user) {
      res.json({
        id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        bio: userProfile ? userProfile.bio : "", // Get bio from UserProfile model
        image: userProfile ? userProfile.image : "", // Get image from UserProfile model
        cover: userProfile ? userProfile.cover : "", // Get cover from UserProfile model
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update the profile of the authenticated user
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const userProfile = await UserProfile.findOne({ user_id: req.user.id });

    if (user) {
      // Update basic user fields
      user.fname = req.body.fname || user.fname;
      user.lname = req.body.lname || user.lname;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = await hashPassword(req.body.password); // Hash new password
      }
      await user.save();

      // Update user profile information (bio, image, cover)
      if (userProfile) {
        // If user profile exists, update it
        userProfile.bio = req.body.bio || userProfile.bio;
        userProfile.image = req.body.image || userProfile.image;
        userProfile.cover = req.body.cover || userProfile.cover;
        await userProfile.save();
      } else {
        // If no profile exists, create a new one
        const newProfile = new UserProfile({
          user_id: req.user.id,
          bio: req.body.bio || "",
          image: req.body.image || "",
          cover: req.body.cover || "",
        });
        await newProfile.save();
      }

      res.json({
        id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        bio: req.body.bio || userProfile.bio || "",
        image: req.body.image || userProfile.image || "",
        cover: req.body.cover || userProfile.cover || "",
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserProfile, updateUserProfile };
