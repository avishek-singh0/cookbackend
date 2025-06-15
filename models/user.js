const mongoose = require("mongoose")
const bcrypt = require('bcrypt');

const userschema = new mongoose.Schema({

name:{
    type:String
},
email:{
    type:String,
    required: true,
    unique: true,
},
password:{
    type:String
},
favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
},{timestamps:true});





userschema.methods.correctPassword =  async function(candidatePassword,userPassword) {
    return await bcrypt.compare(candidatePassword,userPassword);
}


// userschema.methods.changedPasswordAfter = function(JWTTimestamp) {
//     if (this.passwordChangedAt) {
//       const changedTimestamp = parseInt(
//         this.passwordChangedAt.getTime() / 1000,
//         10
//       );
  
//       return JWTTimestamp < changedTimestamp;
//     }
  
//     // False means NOT changed
//     return false;
//   };


const User = mongoose.models.User || mongoose.model('User', userschema);

module.exports = User;

 
