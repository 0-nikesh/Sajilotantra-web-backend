import GovernmentProfile from "../model/GovernmentProfile.js";

// Create a new government profile
const createGovernmentProfile = async (req, res) => {
    try {
        const { name, description, address, latitude, longitude, user_id } = req.body;

        // Create the new profile
        const profile = await GovernmentProfile.create({
            name,
            thumbnail: req.file ? req.file.path : null, // Set the thumbnail path if a file was uploaded
            description,
            address,
            latitude,
            longitude,
            user_id,
        });

        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({ message: "Failed to create government profile", error: error.message });
    }
};

// Get all government profiles
const getAllGovernmentProfiles = async (req, res) => {
    try {
        const profiles = await GovernmentProfile.find().populate("user_id", "fname lname email");
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch government profiles", error: error.message });
    }
};

// Get a single government profile by ID
const getGovernmentProfileById = async (req, res) => {
    try {
        const profile = await GovernmentProfile.findById(req.params.id).populate("user_id", "fname lname email");
        if (!profile) {
            return res.status(404).json({ message: "Government profile not found" });
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch government profile", error: error.message });
    }
};

// Update a government profile
const updateGovernmentProfile = async (req, res) => {
    try {
        const { name, description, address, latitude, longitude } = req.body;

        const profile = await GovernmentProfile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: "Government profile not found" });
        }

        // Update fields
        profile.name = name || profile.name;
        profile.description = description || profile.description;
        profile.address = address || profile.address;
        profile.latitude = latitude || profile.latitude;
        profile.longitude = longitude || profile.longitude;

        // Update thumbnail if a new file is uploaded
        if (req.file) {
            profile.thumbnail = req.file.path;
        }

        await profile.save();

        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: "Failed to update government profile", error: error.message });
    }
};

// Delete a government profile
const deleteGovernmentProfile = async (req, res) => {
    try {
        const profile = await GovernmentProfile.findByIdAndDelete(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: "Government profile not found" });
        }
        res.json({ message: "Government profile deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete government profile", error: error.message });
    }
};

export {
    createGovernmentProfile, deleteGovernmentProfile, getAllGovernmentProfiles,
    getGovernmentProfileById,
    updateGovernmentProfile
};

