const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/api", adminController.apiTest);
router.post("/register", adminController.registerAdmin);
router.post("/login", adminController.loginAdmin);
router.get("/me", adminController.getProfile);
router.get("/all", adminController.getAllAdmins);
router.delete("/delete/:username", adminController.deleteAdmin);

module.exports = router;
