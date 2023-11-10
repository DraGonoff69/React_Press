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