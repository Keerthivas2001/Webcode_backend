const bcrypt= require('bcryptjs');
const jwt=require("jsonwebtoken");
const secretKey="Bjfjfn##%^@fagf"
const saltRounds=10;



 const hashPassword =async(password)=>{
    let salt = await bcrypt.genSalt(10)
    console.log(salt);
    let hashedPassword= await bcrypt.hash(password,salt)
    return hashedPassword
 } 

 const hashCompare=async(password,hashedPassword)=>{
   return await bcrypt.compare(password,hashedPassword)

 }

 const createToken=async(payload)=>{
   let token= await jwt.sign(payload,secretKey,{expiresIn:'5m'})
   return token
   console.log(token);
 }

 const validate=async(req,res,next)=>{
  if(req.headers.authorization){
    let token= req.headers.authorization.split(" ")[1]
    let data=await jwt.decode(token)
    if(Math.floor((+new Date())/1000)<data.exp) {
      next()
    }
    else{
      res.status(401).send({message:"Token Expires"})
    }
  }
  else{
    res.status(400).send({message:"Token Not Found"})
  }
 }

 const roleAdminGaurd = async(req,res,next)=>{

  if(req.headers.authorization)
  {

      let token = req.headers.authorization.split(" ")[1]
      let data = await jwt.decode(token)
      if(data.role==='admin'|| data.role==='manager')
          next()
      else
          res.status(401).send({message:"Only Admins are allowed"})
  }
  else
  {
      res.status(400).send({message:"Token Not Found"})
  }
}
 module.exports={hashPassword,hashCompare,createToken,validate,roleAdminGaurd}