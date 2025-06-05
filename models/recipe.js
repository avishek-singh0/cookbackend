const mongoose = require('mongoose');
const { Schema } = mongoose; 
const recipeSchema = new mongoose.Schema({
    name:String,
    instructions:String,
    thumbnail:String,
    postedAt: {
        type: Date,
        default: Date.now
    },
    postedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
        
    }],
    ingredients: [String]
});

module.exports = mongoose.model('Recipe', recipeSchema);