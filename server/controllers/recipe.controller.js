const Recipe = require('../models/recipe.model.js');
module.exports = {
    getAll: (req, res) => {
        console.log("GET:/")
        Recipe.find({})
            .then((recipes) => {
                res.json(recipes);
            })
            .catch((err) => {
                console.log("error found in getting recipes");
                res.json(err);
            })
    },
    create: (req, res) => {
        const { title, releaseDate, rating, director, genre, plot, recipeUrl } = req.body;
        Recipe.create({
            name, description, cookTime, ingredients, steps, isIntantPot
        })
            .then(recipe => res.json(recipe))
            .catch(err => res.status(400).json(err));
    },
    getOne: (req, res) => {
        console.log("GET:/{id}")
        Recipe.findById(req.params.id)
            .then((recipe) => {
                res.json(recipe);
            })
            .catch((err) => {
                console.log("error found in getting recipes");
                res.status(404).json(err);
            });
    },
    update: (req, res) => {
        console.log("PUT:/{id}");
        const { name, description, cookTime, ingredients, steps, isIntantPot } = req.body;
        Recipe.findByIdAndUpdate(req.params.id, req.body, { 
            new:true, runValidators: true 
        })
            .then(recipe => res.json(recipe))
            .catch(err => res.status(400).json(err));
    },
    delete: (req, res) => {
        Recipe.findByIdAndDelete(req.params.id)
            .then(recipe => res.json({id:recipe._id}))
            .catch(err => res.json(err));
    }
}    
