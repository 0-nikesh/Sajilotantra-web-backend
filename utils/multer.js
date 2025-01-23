import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

// Configure Cloudinary storage
// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: "images", // Change this to the folder where you want to store files in Cloudinary
//         allowed_formats: ["jpg", "png", "jpeg"], // File formats allowed
//     },
// });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: (req) => `user-profile/${req.user.id}`, // Create a folder for each user
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

const upload = multer({ storage });

export default upload;