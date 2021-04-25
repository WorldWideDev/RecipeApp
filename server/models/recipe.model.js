const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [ true, "Name is required" ],
    },
    description: { 
        type: String
    },
    ingredients: { 
        type: [String],
        validate: {
            validator: i => Array.isArray(i) && i.length > 0,
            message: "At least one ingredient required"
        } 
    },
    steps: {
        type: [String],
        //validate: {
        //    validator: s => Array.isArray(s) && s.length > 0,
        //    message: "At least one step required"
        //} 
    },
    isIntantPot: {
        type: Boolean
    },
    cookingTime: {
        type: String,
        required: [ true, "Cooking time is required" ],
    }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', RecipeSchema);
