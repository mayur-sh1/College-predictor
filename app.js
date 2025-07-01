const express=require('express');
const app=express();
const mongoose=require('mongoose');

require('dotenv').config();
const port = process.env.PORT ;


app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))

const adminRoutes = require('./routes/admin.js'); // adjust path
const studentRoutes= require('./routes/students.js'); // adjust path
const counsellingRoutes = require('./routes/counselling.js'); // adjust path
const collegeRoutes = require('./routes/colleges.js'); // adjust path
const branchRoutes = require('./routes/branch.js'); // adjust path
const cutoffRoutes = require('./routes/cutoffs.js'); // adjust path
const predictRoutes = require('./routes/predict.js'); // adjust path

// tester api
app.get('/',(req,res)=>{
    // res.render("index");
    res.send("Home Page");
})  


app.use('/admin',adminRoutes); // Use the admin routes

app.use('/branch', branchRoutes); // Use the branch routes

app.use('/colleges', collegeRoutes); // Use the college routes

app.use('/counselling', counsellingRoutes); // Use the counselling routes

app.use('/cutoffs', cutoffRoutes); // Use the cutoff routes

app.use('/predict', predictRoutes); // Use the predict routes

app.use('/students',studentRoutes); // Use the student routes




app.listen(port,()=>{
    console.log(`Server is running..`);
})