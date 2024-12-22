const Guidance = require("../model/Guidance");

// Create a new guidance (Admin-only action)
const createGuidance = async (req, res) => {
  try {
    const { title, description, thumbnail, category, documents_required } = req.body;

    // Ensure all required fields are provided
    if (!title || !description || !thumbnail || !category || !documents_required) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create guidance document
    const guidance = await Guidance.create({
      title,
      description,
      thumbnail,
      category,
      documents_required,
      user_id: req.user._id, // Assuming `req.user` contains the authenticated admin's details
    });

    res.status(201).json(guidance);
  } catch (error) {
    console.error("Error creating guidance:", error.message);
    res.status(500).json({ message: "Failed to create guidance.", error: error.message });
  }
};

// Get all guidances (Accessible to all users)
const getAllGuidances = async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = {};

    // Apply filters if provided
    if (category) query.category = category;
    if (search) query.title = new RegExp(search, "i"); // Case-insensitive search

    const guidances = await Guidance.find(query);
    res.status(200).json(guidances);
  } catch (error) {
    console.error("Error fetching guidances:", error.message);
    res.status(500).json({ message: "Failed to fetch guidances.", error: error.message });
  }
};

// Get a single guidance by ID (Accessible to all users)
const getGuidanceById = async (req, res) => {
  try {
    const guidance = await Guidance.findById(req.params.id);
    if (!guidance) {
      return res.status(404).json({ message: "Guidance not found." });
    }
    res.status(200).json(guidance);
  } catch (error) {
    console.error("Error fetching guidance by ID:", error.message);
    res.status(500).json({ message: "Failed to fetch guidance.", error: error.message });
  }
};


const updateGuidance = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      thumbnail,
      category,
      documents_required,
    } = req.body;

    // Find the guidance by ID
    const guidance = await Guidance.findById(id);

    if (!guidance) {
      return res.status(404).json({ message: "Guidance not found" });
    }

    // Update fields only if provided in the request
    if (title) guidance.title = title;
    if (description) guidance.description = description;
    if (thumbnail) guidance.thumbnail = thumbnail;
    if (category) guidance.category = category;
    if (documents_required) guidance.documents_required = documents_required;

    // Save the updated guidance
    const updatedGuidance = await guidance.save();

    res.status(200).json({
      message: "Guidance updated successfully",
      guidance: updatedGuidance,
    });
  } catch (error) {
    console.error("Error updating guidance:", error.message);
    res.status(500).json({
      message: "Failed to update guidance",
      error: error.message,
    });
  }
};

module.exports = {
  createGuidance,
  getAllGuidances,
  getGuidanceById,
  updateGuidance
};
