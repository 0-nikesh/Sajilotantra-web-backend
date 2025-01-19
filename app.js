import AdminJSExpress from "@adminjs/express"; // Correct import
import * as AdminJSMongoose from "@adminjs/mongoose"; // Import everything as a namespace
import AdminJS from "adminjs"; // Correct import
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import GovernmentProfile from "./model/GovernmentProfile.js";
import Guidance from "./model/Guidance.js";
import Notification from "./model/Notification.js";
import Post from "./model/Post.js";
import User from "./model/User.js";

dotenv.config();
connectDB();

// Register AdminJS adapter for Mongoose
AdminJS.registerAdapter(AdminJSMongoose);

// Import models

// Initialize AdminJS
const adminJs = new AdminJS({
  resources: [
    { resource: User },
    // { resource: UserProfile, options: { parent: { name: 'User Management' } } },
    { resource: Post },
    { resource: Guidance },
    { resource: Notification },
    { resource: GovernmentProfile },
    // { resource: Feedback, options: { parent: { name: 'Feedback Management' } } },
  ],
  rootPath: '/admin',
});

// Create AdminJS router
const adminRouter = AdminJSExpress.buildRouter(adminJs);

const app = express();
app.use(express.json());

// Mount AdminJS router
app.use(adminJs.options.rootPath, adminRouter);


// import feedbackRoute from "./routes/FeedbackRoute.js";
// import guidanceRoute from "./routes/GuidanceRoute.js";
// import notificationRoute from "./routes/NotificationRoute.js";
import postRoute from "./routes/PostRoute.js";
// import userProfileRoute from "./routes/UserProfileRoute.js";
import userRoute from "./routes/UserRoute.js";

app.use("/api/users", userRoute);
// app.use("/api/users", userProfileRoute);
// app.use("/api/profiles", userProfileRoute);
app.use("/api/posts", postRoute);
// app.use("/api/guidances", guidanceRoute);
// app.use("/api/notifications", notificationRoute);
// app.use("/api/feedbacks", feedbackRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`AdminJS running at http://localhost:${PORT}/admin`);
});

// const express = require("express");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const cors = require("cors")
// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());
// const corsOptions = {
//   origin: ["http://localhost:5173"],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
//   // maxAge: 3600, // Maximum age of the preflight request cache
// };
// app.use(cors(corsOptions));

// // Routes
// app.use("/api/users", require("./routes/UserRoute"));
// app.use("/api/users", require("./routes/UserProfileRoute"));
// app.use("/api/profiles", require("./routes/UserProfileRoute"));
// app.use("/api/posts", require("./routes/PostRoute"));
// app.use("/api/guidances", require("./routes/GuidanceRoute"));
// app.use("/api/notifications", require("./routes/NotificationRoute"));
// app.use("/api/feedbacks", require("./routes/FeedbackRoute"));

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
