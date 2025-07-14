const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto=require('crypto');
const jwt =require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);  

const googleLogin = async(req,res)=>{
  const{tokenId}=req.body;
  try {
    
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture } = ticket.getPayload();

    
    let user = await User.findOne({ email });

    if (!user) {
      
      user = await User.create({
        name,
        email,
        password: 'google-auth', 
      });
    }

    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error("Google Login Failed:", error);
    res.status(400).json({ message: 'Google login failed' });
  }
};





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
//forgotpassword
const forgotpassword =async(req,res)=>{
  const {email}= req.body

 try {
  const user=await User.findOne({email});
  if(!user){
    return res.status(404).json({ message: 'No user with that email'})
  }
  //if user is present than generate token 
  const resetToken=user.generatePasswordResetToken();
  await user.save()

      const resetUrl = `http://localhost:5000/api/reset-password/${resetToken}`;
     
      const message = `Hey ${user.name},\n\nClick the link below to reset your password:\n\n${resetUrl}\n\nThis link will expire in 15 minutes.`;

       await sendEmail(user.email, "Password Reset", message);

    res.status(200).json({
      message: 'Password reset link generated',
      resetUrl, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating reset link' });
  }
};

//resetpassword
const resetpassword= async(req,res)=>{
  const{password}= req.body
  const resetToken=req.params.token;
    const hashedToken=crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')


    try {
      const user= await User.findOne({
        resetPasswordToken:hashedToken,
        resetPasswordExpires:{$gt: Date.now()}
      })
      if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
// setting new password

const salt =  await bcrypt.genSalt(10);
user.password=await bcrypt.hash(password,salt);

user.resetPasswordExpires=undefined;
user.resetPasswordToken=undefined;
await user.save()
       res.status(200).json({ message: 'Password updated successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not reset password' });
  }
};


module.exports={registerUser,loginUser,forgotpassword,resetpassword}