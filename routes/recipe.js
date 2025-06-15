const express = require('express')
const router = express.Router();
const recipeController = require('./../controller/recipe')
const auth = require('../middleware/auth');

router.post('/create',auth.authenticateToken,  recipeController.createRecipe);// Create a new recipe
router.get('/all',  recipeController.getAllRecipes); // Get all recipes


// routes/recipeRoutes.js
router.get('/my-recipes', auth.authenticateToken, recipeController.getMyRecipes);

router.get('/:id',  auth.authenticateToken,recipeController.getRecipeById);
 // Get a recipe by ID
router.delete('/delete/:id', auth.authenticateToken, recipeController.deleteRecipe); // Delete a recipe by ID 
module.exports = router;


