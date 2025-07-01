const { Prediction } = require('../models/schema');

// Test Route
exports.apiTest = (req, res) => {
  res.send("Prediction API is working");
};

// Create new prediction
exports.createPrediction = async (req, res) => {
  const { studentId, counsellingId, predictedColleges } = req.body;

  try {
    const newPrediction = await Prediction.create({
      studentId,
      counsellingId,
      predictedColleges
    });

    res.status(201).json({
      message: "Prediction created successfully",
      prediction: newPrediction
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create prediction", details: err.message });
  }
};

// Get predictions by studentId
exports.getPredictionsByStudentId = async (req, res) => {
  const { studentId } = req.params;

  try {
    const predictions = await Prediction.find({ studentId })
      .populate('studentId counsellingId predictedColleges.collegeId predictedColleges.branchId');

    if (!predictions.length) {
      return res.status(404).json({ error: "No predictions found for this student" });
    }

    res.json({ message: "Predictions fetched", predictions });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch predictions", details: err.message });
  }
};

// Delete a prediction (Admin access)
exports.deletePrediction = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Prediction.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Prediction not found" });
    }

    res.json({ message: "Prediction deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete prediction", details: err.message });
  }
};
