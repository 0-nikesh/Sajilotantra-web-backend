import User from "../model/User.js";
import UserProfile from "../model/UserProfile.js";

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
    const userId = req.user.id; // Assuming `req.user.id` is populated by `protect` middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    user.fname = req.body.fname || user.fname;
    user.lname = req.body.lname || user.lname;
    user.email = req.body.email || user.email;

    // If password is provided, update it (assuming you hash it elsewhere)
    if (req.body.password) {
      user.password = req.body.password;
    }

    await user.save();

    // Handle the user profile
    let userProfile = await UserProfile.findOne({ user_id: userId });

    if (!userProfile) {
      // Create a new profile if it doesn't exist
      userProfile = new UserProfile({
        user_id: userId,
        bio: req.body.bio || "",
        image: req.files.image ? req.files.image[0].path : "",
        cover: req.files.cover ? req.files.cover[0].path : "",
      });
    } else {
      // Update existing profile
      userProfile.bio = req.body.bio || userProfile.bio;
      userProfile.image = req.files.image ? req.files.image[0].path : userProfile.image;
      userProfile.cover = req.files.cover ? req.files.cover[0].path : userProfile.cover;
    }

    await userProfile.save();

    res.json({
      id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      bio: userProfile.bio,
      image: userProfile.image,
      cover: userProfile.cover,
    });
  } catch (error) {
    console.error("Error updating user profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


export { getUserProfile, updateUserProfile };

