const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.get("/api", studentController.apiTest);
router.post("/register", studentController.registerStudent);
router.post("/login", studentController.loginStudent);
router.get("/:_id", studentController.getStudentById);
router.put("/:_id", studentController.updateStudent);
router.delete("/:_id", studentController.deleteStudent);

module.exports = router;

