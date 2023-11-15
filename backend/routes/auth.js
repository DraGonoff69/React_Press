const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'AyushAyushAyushok';
var fetchuser=require('../middleware/fetchuser')


router.post('/createuser', [
    body('name', 'Name should be at least 3 letters').isLength({ min: 3 }),
    body('email', 'Enter email').isEmail(),
    body('password', 'Password must be at least 5 letters').isLength({ min: 5 }),
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({success, error: "A user with this email already exists" });
        }
        
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name,
            email: email,
            password: secPass
        });

        await newUser.save();

        // Generate JWT token after user is saved
        const data = {
            user: {
                id: newUser.id // Using newUser instead of user
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(authtoken);
        success=true;
        res.json({ success,authtoken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/getuser',fetchuser, async (req, res) => {
 
    try{
        const userId=req.user.id; 
        const user=await User.findById(userId).select("-password")
        res.send(user)
    } catch(error){
        res.status(500).send("internal server error");
    }
})


module.exports = router;

// Route 2: authenticate a user 
router.post('/login', [
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try{

        let user= await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"please login with correct credentails"})
        }
        const passwordCompare= await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            success=false
            return res.status(400).json({error:"please login with correct credentails"})
        }
        const data = {
            user: {
                id: user.id 
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true
        res.json({ success,authtoken });
    } catch(error){
        res.status(500).send("internal server error");
    }
})