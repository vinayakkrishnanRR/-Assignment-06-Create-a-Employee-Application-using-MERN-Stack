const express = require('express');
const empData = require('../model/employees');
const router = express.Router()
const jwt = require('jsonwebtoken');
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

function tokenVerify(req,res,next){
  try{
    const token= req.headers.token;
    console.log(token);

    if(!token) throw 'Unauthorized';
    let pl=jwt.verify(token,'empapp');

    if(!pl) throw 'Unauthorized';
    next();

  }catch(error){
    res.status(401).send(error);
  }
}

router.post('/login',async (req, res) => {
  try {
    const { email, password } = req.body;
        const adminEmail = 'admin@gmail.com';
        const adminPass = 'admin123';

    if (email === adminEmail && password === adminPass){
      const plAdmin = { email: adminEmail };
      const token = jwt.sign(plAdmin, 'empapp');
      res.status(200).json({ message: 'Login Success', token });
    } else {
      const Ufound = await empData.findOne({ email, password });
      if (Ufound) {
        let pl ={email:email, password:password};
        let token = jwt.sign(pl,'empapp');
         res.status(200).send({message:'Login Success', token:token});
      } else {
         res.status(401).send('Invalid credentials. Try again.');
      }
    }
  } catch (error) {
     console.error('Login Error:', error);
     res.status(500).send(error);
  }
});

//CRUD

router.get("/",tokenVerify,async (req, res) => {
    try {
      const getEmp = await empData.find();
      res.json(getEmp);
    } catch (error) {
      res.status(500).json({message: error.message})
    }
});

router.post('/add',tokenVerify,async (req, res) => {
    const data = new empData({
        name: req.body.name,
        position: req.body.position,
        location :req.body.location,
        salary : req.body.salary,
        email : req.body.email,
        password :req.body.password
    })
  
    try {
        const dataSave = await data.save();
        res.status(200).send("Updated Successfully")
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.delete('/delete/:id',tokenVerify,async (req, res) => {
  try {
      const id = req.params.id;
      const data = await empData.findByIdAndDelete(id);
      res.json(`Employee Credentials Deleted`);
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})

router.put("/update/:id",tokenVerify,async (req, res) => {
  try {
  const item = req.body;
  const data = await empData.findByIdAndUpdate(req.params.id,item);   
    res.status(200).send('Data Updated');
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports=router;