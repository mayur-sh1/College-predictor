const express = require("express");
const router = express.Router();
const counsellingController = require("../controllers/counsellingController");

router.get("/api", counsellingController.apiTest);
router.post("/create", counsellingController.createCounselling);
router.get("/read", counsellingController.readAllCounselling);
router.get("/:_id", counsellingController.readCounsellingById);
router.put("/:_id", counsellingController.updateCounselling);
router.delete("/:_id", counsellingController.deleteCounselling);

module.exports = router;