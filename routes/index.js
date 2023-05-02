var express = require('express');
var router = express.Router();
const{Userclient}=require('../schemas/newClients')
const mongoose=require('mongoose')
const {dbUrl}=require('../common/dbConfig')
mongoose.connect(dbUrl)
const {hashPassword}=require('../common/auth')
/* GET home page. */

//clients

router.get('/clients',async function(req, res) {
  try{
   let users= await Userclient.find();
   res.status(200).send({
     users,
     message:"Users Data Fetch Successfull!"
   })
  }
  catch(error){
   res.status(500).send({
     message:"Internal Server Error",
     error
   })
  }
 });

router.post('/signingup',async(req,res)=>{
  try{
let user = await Userclient.findOne({email:req.body.email})
if(!user){
  let hashedPassword = await hashPassword(req.body.password)
 req.body.password= hashedPassword
   let user = await Userclient.create(req.body)

  res.status(201).send({
    message:"User Signup Successfull!",
   
  })
}
else{
  res.status(400).send({message:"User Already Exists!"})
}
  }catch(error){
    res.status(500).send({ 
      message:"Internal Server Error",
      error
    })
  }
})
module.exports = router;
