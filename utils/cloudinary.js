import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Debugging environment variables
console.log("Cloudinary Config Check:", {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Missing",
});

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
