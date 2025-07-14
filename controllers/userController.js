const getProfile = (req,res)=>{
  res.status(200).json({
    message:"user profile fetched successfully",
    user:req.user,
  })
};

module.exports={getProfile}