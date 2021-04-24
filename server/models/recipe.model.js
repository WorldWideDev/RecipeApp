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
        type: [String]
    },
    steps: {
        type: [String],
        required: [ true, "Steps are required" ],
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
