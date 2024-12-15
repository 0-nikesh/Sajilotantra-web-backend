const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/UserRoute"));
app.use("/api/users", require("./routes/UserProfileRoute"));
app.use("/api/profiles", require("./routes/UserProfileRoute"));
app.use("/api/posts", require("./routes/PostRoute"));
app.use("/api/guidances", require("./routes/GuidanceRoute"));
app.use("/api/notifications", require("./routes/NotificationRoute"));
app.use("/api/feedbacks", require("./routes/FeedbackRoute"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
