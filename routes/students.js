const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

const auth = require('../middlewares/authMiddleware');

router.get("/api", studentController.apiTest);
router.post("/register", studentController.registerStudent);
router.post("/login", studentController.loginStudent);
router.get("/:_id", auth(['student']),studentController.getStudentById);
router.put("/:_id", auth(['student']),studentController.updateStudent);
router.delete("/:_id", auth(['admin']),studentController.deleteStudent);

module.exports = router;

