const RecipeController = require('../controllers/recipe.controller.js');
module.exports = function(app) {
    app.get('/api', RecipeController.getAll);
    app.post('/api', RecipeController.create);
    app.get('/api/:id', RecipeController.getOne);
    app.put('/api/:id', RecipeController.update);
    app.delete('/api/:id', RecipeController.delete);
}
