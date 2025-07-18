const mongoose = require('mongoose');

const crypto=require('crypto')



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
    minlength: 6, 
  },
  role:{
    type:String,
    enum:['user','admin'],
    default:'user',
  },
  resetPasswordToken:String,
  resetPasswordExpires:Date,
refreshTokens: [String],

}, {
  timestamps: true, 
});
userSchema.methods.generatePasswordResetToken= function(){
  // generating random token 
  const resetToken=crypto.randomBytes(32).toString('hex');

  //hashing token
  this.resetPasswordToken = crypto
  .createHash('sha256')
  .update(resetToken)
  .digest('hex')

  this.resetPasswordExpires= Date.now() + 15*60*1000
  return resetToken;  

};

module.exports = mongoose.model('User', userSchema);
