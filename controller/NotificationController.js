import Notification from ("../model/Notification.js");

// Fetch all notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({});
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications" });
  }
};

// Create a notification (Admin-only)
const createNotification = async (req, res) => {
  try {
    const { title, description, posted_by } = req.body;

    const notification = await Notification.create({
      title,
      description,
      posted_by: req.user.name || "Admin", // Assuming req.user has name
      user_id: req.user._id,
    });

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: "Error creating notification" });
  }
};

export { createNotification, getNotifications };

