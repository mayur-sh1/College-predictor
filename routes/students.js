const express = require("express");
const router = express.Router();

// importing Model
const { Student } = require("../models/schema.js");

// api test route
router.get("/api", function (req, res) {
  res.send("Student API is working");
});

router.post("/register", async function (req, res) {
  const {name,email,phone,password,exam,rank,category,homeState,gender,} = req.body;

  const existingPhone = await Student.findOne({ phone: phone });
  const existingEmail = await Student.findOne({ email: email });

  if (existingPhone) {
    return res
      .status(400)
      .json({ error: "Student with this phone number already registered" });
  }

  if (existingEmail) {
    return res
      .status(400)
      .json({ error: "Student with this email already registered" });
  }

  try {
    const newStudent = await Student.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password: password,
      exam: exam,
      rank: rank,
      category: category,
      homeState: homeState,
      gender: gender,
    });
    res.status(201).json({
      message: "Student registered successfully",
      student: newStudent,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async function (req, res) {
  const { phone, password } = req.body;
  if (!(await Student.findOne({ phone: phone }))) {
    res.json({ error: "Register first" });
    return;
  }

  const student = await Student.findOne({ phone: phone });

  if (student.password !== password) {
    res.json({ error: "Incorrect password" });
    return;
  }

  // Update lastLoginAt
  student.lastLoginAt = new Date();
  await student.save(); // this is enough

  res.json({ message: "Login successful", student: student });
});

const mongoose = require("mongoose");

router.get("/:_id", async function (req, res) {
  const { _id } = req.params;

  //  Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.json({ error: "Invalid student ID format" });
  }

  try {
    const student = await Student.findById(_id);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ student });
  } catch (err) {
    console.error("Error fetching student:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:_id", async function (req, res) {
  const { _id } = req.params;

  const {name,email,password,phone,exam,rank,category,homeState,gender,} = req.body;
  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "Invalid student ID format" });
  }

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      _id,
      { name, email, password, phone, exam, rank, category, homeState, gender },
      { new: true } // Return updated doc
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Only run when student is found
    res.json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:_id", async function (req, res) {
    const { _id } = req.params;
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ error: "Invalid student ID format" });
    }
    
   if(! Student.findById(_id)){
    res.send({error:"Student not found"});
   }

   const deletedStudent = await Student.findByIdAndUpdate({_id:_id},{isActive:false},{new:true}).then((student) => {
    res.json({
      message: "Student deleted successfully",
      student: student
    });
  }).catch((err) => {
    console.error("Error deleting student:", err);
    res.status(500).json({ error: "Internal Server Error" });
  })
});


module.exports = router;
