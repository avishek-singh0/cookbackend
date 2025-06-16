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


userschema.pre("save", async function (next) {
  // Only run if password is modified
  if (!this.isModified("password")) return next();

  // Hash the password with bcrypt
  this.password = await bcrypt.hash(this.password, 12);
  next();
});


userschema.methods.correctPassword =  async function(candidatePassword,userPassword) {
    return await bcrypt.compare(candidatePassword,userPassword);
}


const User = mongoose.models.User || mongoose.model('User', userschema);

module.exports = User;

 
