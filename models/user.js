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


const User = mongoose.models.User || mongoose.model('User', userschema);

module.exports = User;

 
