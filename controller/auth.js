const User = require('./../models/user');
const jwt = require('jsonwebtoken');



const signtoken = id =>  {
    return jwt.sign({id}, process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRES_IN
}) };


exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Create user
    const newUser = await User.create({
      name,
      email,
      password
    });

    const token = signtoken(newUser._id);
    console.log("New User Registered:", newUser);

    // Success Response
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email
        }
      }
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(400).json({
      status: "fail",
      message: "Invalid input or duplicate email",
      error: error.message
    });
  }
};


exports.login = async(req,res,next)=>{
    try {
        const {email,password }= req.body;
 
        //1 Check email and pass
        if(!email || !password){
            return res.status(400).json(
               { status:"Please Provide email and passoword!"}
            )
        }

        const user = await User.findOne({email});
        //  console.log(user.id);

         //user.passowrd = $$$224555$$$$$23$44$h3uhrjwensdn4d
         if(!user || !(await user.correctPassword(password,user.password))){
            return   res.status(400).json(
                { status:"Incorrect email and passoword!"}
             )
       } 
        console.log(user);
       const token = signtoken(user._id);
       res.status(200).json({
        
        status:"success",
        token
    })

 
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}


// exports.protect = async(req,res,next)=>{
   
//    try {
//      //1 Getting tokern and check of it there
//      let token;
//      if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
//        token = req.headers.authorization.split(' ')[1];
 
//      }
 
//     //  console.log(token)
 
//      if (!token) {
//          console.log('No token found in the headers');
//            return res.status(401).json(
//              { status:"You are not logged in !Please logging!"}
//           )
//      }
//      //2 Verification token
//      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
 
//      //3 Check if user still exists
//      const currentUser = await User.findById(decoded.id);
//      if (!currentUser) {
//          return res.status(401).json(
//              { status:"The user belonging to this token does no longer exist!"}
//           )
//      }
 
//      //4 Check if user changes ppswd after the tokern war issued
//      if (currentUser.changedPasswordAfter(decoded.iat)) {
//          return res.status(401).json(
//              { status:"User recently changed password! Please log in again.!"}
//           )
//        }
     
//        // GRANT ACCESS TO PROTECTED ROUTE
//        req.user = currentUser;
//        next();
//    } catch (error) {
    
//     // console.error(err);
//     return res.status(401).json({ message: 'Unauthorized' });
//    }
   
   
// };
