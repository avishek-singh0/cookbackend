const User = require('./../models/user');
const jwt = require('jsonwebtoken');


const signtoken = id =>  {
    return jwt.sign({id}, process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRES_IN
}) };


exports.signin = ('/register', async (req, res) => {
    const {name,email ,password} = req.body;
    try {
        //check for user exit or not
      const userExit = await User.findOne({email:email})
      if(userExit) return res.status(400).json({message: "User already exists"});
        
        //if not create a new user
        const newUser = await User.create({
                fullName: name,
                email: email,
                password: password,
            });

    } catch (error) {
        
    }
})
