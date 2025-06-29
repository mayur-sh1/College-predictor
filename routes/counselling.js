const express = require('express');
const router = express.Router();

// importing Model
const {Counselling} = require('../models/schema.js');
const mongoose = require('mongoose');

router.get('/api', function(req, res){
    res.send("Counselling API is working")
});

router.post('/create',async function(req,res){
    const {name,year,exam} = req.body;
    if(await Counselling.findOne({name:name})){
        return res.send({message:"Counselling already exists"})
    }
    const newCounselling=await Counselling.create({name:name,year:year,exam:exam,description:description})
    res.send({message:"Counselling created successfully",data:newCounselling})
})


router.get('/read',async function(req,res){
    const counsellings = await Counselling.find().sort({name:1})
    res.send({message:"Counselling read successfully",data:counsellings})
})

router.get('/:_id',async function(req,res){
    const _id=req.params
    

    // Validate MongoDB ObjectId
       if (! mongoose.Types.ObjectId.isValid(_id)) {
           return res.status(400).json({ error: "Invalid student ID format" });
         }

    const counselling = await Counselling.findById(_id)
    if(counselling){
        res.send({message:"Counselling read successfully",data:counselling})
    }
    else{
        res.send({message:"Counselling not found"})
    }
})

router.put('/:_id',async function(req,res){
    const {_id}=req.params
    // Validate MongoDB ObjectId
        if (! mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ error: "Invalid student ID format" });
        }

    const {name,year,exam,description} = req.body;

    try {
    const updatedCounselling = await Counselling.findByIdAndUpdate(
      _id,
      {
        name,
        year,
        exam,
        description,
        updatedAt: new Date(), // ✅ use Date object instead of Date.now
      },
      { new: true }
    );

    if (!updatedCounselling) {
      return res.status(404).json({ message: "Counselling record not found" });
    }

    res.status(200).json({
      message: "Updated successfully",
      data: updatedCounselling,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update counselling",
      error: error.message,
    });
  }
})


router.delete('/:_id', async function (req, res) {
    const { _id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ error: "Invalid counselling ID format" });
    }

    try {
        const counselling = await Counselling.findByIdAndDelete(_id);

        if (!counselling) {
            return res.status(404).json({ error: "Counselling entry not found" });
        }

        res.status(200).json({ message: "Counselling entry deleted successfully", deletedData: counselling });
    } catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
});


module.exports = router;