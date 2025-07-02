const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken')
// registering user
const registerUser=async(req,res)=>{
  const {name,email,password}=req.body
  try {
    //checking that all fields are filled
    if(!name|| !email||!password)
    return res.status(400).json({message:"please fill all fields"})
    //checking if user already exist
    const userExists=await User.findOne({email})
    if(userExists){
      return res.status(400).json({ message:"User already exist"})
    }    



    //hashing the password
    const salt =await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password,salt);

    //creating the user

    const user= await User.create({
      name,
      email,
      password:hashedPassword 
    })
        res.status(201).json({
          message:"user created successfully",
          user:{
              _id:user.id,
              name:user.name,
              email:user.email
          },
        })


                  

      }catch(error) {
     console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
//login user 
const loginUser = async(req,res)=>{
const {email,password}=req.body;
try {
  if(!email|| !password){
  return res.status(400).json({message:"please enter both email and passoword"})
}
//finding user by email id 

const user = await User.findOne({email});
if(!user) {
 return res.status(400).json({message:"invalid email or password "})
}
// if user is present than compare passoword

const isMatched= await bcrypt.compare (password,user.password)
if(!isMatched) {
  return res.status(400).json({message:"invalid password or email"})
}
// if password matched then create JWT token 
const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
  expiresIn:'7d'
})

res.status(200).json({
message: 'Login successfully',
token,
user:{
  _id:user._id,
  name:user.name,
  email:user.email
}
})

}
catch (error) {
  console.log(error);
  res.status(500).json({message:"error while login"})
}
}


module.exports={registerUser,loginUser}