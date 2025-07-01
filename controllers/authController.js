const User = require('../models/User');
const bcrypt = require('bcryptjs');

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
module.exports={registerUser}