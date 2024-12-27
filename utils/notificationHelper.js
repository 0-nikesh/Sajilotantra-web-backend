const Notification = require("../model/Notification");

const createUserNotification = async (title, description, userId) => {
    try {
        await Notification.create({
            title,
            description,
            user_id: userId,
        });
    } catch (error) {
        console.error("Error creating notification:", error);
    }
};

module.exports = { createUserNotification };