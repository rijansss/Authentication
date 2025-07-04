const express= require('express');

const {registerUser,loginUser} = require('../controllers/authController.js')
const {getProfile}=require('../controllers/userController.js')
const {protect}=require('../middleware/authMiddleware.js')

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);

module.exports=router;