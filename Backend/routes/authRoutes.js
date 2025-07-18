const express= require('express');

const {registerUser,loginUser,forgotpassword,resetpassword,logoutall,logout} = require('../controllers/authController.js')
const {getProfile}=require('../controllers/userController.js')
const {protect}=require('../middleware/authMiddleware.js')
const { googleLogin } = require('../controllers/authController');

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);

router.post('/forgot-password', forgotpassword);
router.post('/reset-password/:token', resetpassword);
router.get('/profile', protect, getProfile);
router.post('/auth/google',googleLogin);
router.post('/logout-all', protect, logoutall);
router.post('/logout', protect, logout);

module.exports=router;  
