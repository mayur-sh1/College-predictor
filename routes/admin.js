const { Admin } = require('../models/schema'); // use require, not impor // adjust the path if needed

const express= require('express');
const router = express.Router();

router.get('/api',function(req,res){
    res.send("Admin API is working");
});
router.post('/register',async function(req,res){
    let {name,email,username,password,role}=req.body;

    if(await Admin.findOne({username:username})){
        return res.status(400).json({error:"Username already exists"});
    }
    if(await Admin.findOne({email:email})){
        return res.status(400).json({error:"Email already exists"});
    }

    const newAdmin=await Admin.create({
        name: req.body.name,
        email: req.body.email,          
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    })
    res.json(newAdmin );
});
router.post('/login',async function(req,res){
    const {username,password}=req.body;
    if(! await Admin.findOne({username:username})){
        res.json({error:"register first"});
        //res.redirect('/admin/register');
    }
    lastLoginAt = new Date();
    await Admin.updateOne({username:username}, {lastLoginAt:lastLoginAt});
    res.json({message:"login successful"});
    //res.redirect('/admin/me')
})
router.get('/me',async function(req,res){
    const {username}=req.body;
    if(await Admin.findOne({username:username})){
        res.json({message:"Admin profile", admin: await Admin.findOne({username:username})});
    }
    else{
        //res.redirect('/admin/login');
        res.json({error:"Profile not found"})
    }
});
router.get('/all',async function(req,res){
    const admins = await Admin.find();
    if(admins.length === 0) {
        return res.json({message: "No admins found"});
    }
    res.json(admins);
})
router.delete('/delete/:username',async function(req,res){
    const { username } = req.params;
    const admin = await Admin.findOne({username:username});
    if(!admin){
        return res.json({error:"Admin not found"});
    }
    await Admin.deleteOne({username:username});
    res.json({message:"Admin deleted successfully"});
})      
module.exports = router;