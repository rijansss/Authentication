const getProfile = (req,res)=>{
  res.status(200).json({
    message:"user profile fetche  d successfully",
    user:req.user,
  })
};

module.exports={getProfile}