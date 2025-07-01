const { Admin } = require("../models/schema");

// GET /admin/api
exports.apiTest = (req, res) => {
  res.send("Admin API is working");
};

// POST /admin/register
exports.registerAdmin = async (req, res) => {
  const { name, email, username, password, role } = req.body;

  try {
    const existingUser = await Admin.findOne({ username });
    if (existingUser) return res.status(400).json({ error: "Username already exists" });

    const existingEmail = await Admin.findOne({ email });
    if (existingEmail) return res.status(400).json({ error: "Email already exists" });

    const newAdmin = await Admin.create({ name, email, username, password, role });
    res.status(201).json({ message: "Admin registered successfully", admin: newAdmin });
  } catch (err) {
    res.status(500).json({ error: "Failed to register admin", details: err.message });
  }
};

// POST /admin/login
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).json({ error: "Register first" });

    if (admin.password !== password) return res.status(401).json({ error: "Incorrect password" });

    admin.lastLoginAt = new Date();
    await admin.save();

    res.json({ message: "Login successful", admin });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
};

// GET /admin/me
exports.getProfile = async (req, res) => {
  const { username } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).json({ error: "Profile not found" });

    res.json({ message: "Admin profile", admin });
  } catch (err) {
    res.status(500).json({ error: "Failed to get profile", details: err.message });
  }
};

// GET /admin/all
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    if (admins.length === 0) return res.json({ message: "No admins found" });

    res.json({ admins });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch admins", details: err.message });
  }
};

// DELETE /admin/delete/:username
exports.deleteAdmin = async (req, res) => {
  const { username } = req.params;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    await Admin.deleteOne({ username });
    res.json({ message: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete admin", details: err.message });
  }
};
