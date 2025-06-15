const Recipe = require('../models/recipe');
const auth = require('../middleware/auth');

// Create a new recipe
exports.createRecipe = async (req, res) => {
    const { name, instructions, thumbnail, ingredients } = req.body;
    try {
   const newRecipe = await Recipe.create({
            name,
            instructions,
            thumbnail,
            ingredients,
            postedBy: req.user.id // Assuming req.user is set by auth middleware
        });
        console.log('req.user:', req.user),
        res.status(201).json({
            status: 'success',
            

            data: {
                recipe: newRecipe
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating recipe', error });
    }
};

// Get all recipes
exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('postedBy', 'name')
        

        res.status(200).json({
            status: 'success',
            data: {
                recipes
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipes', error });
    }
}

// Delete
exports.deleteRecipe =  async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({
      _id: req.params.id,
      postedBy: req.user.id
    });

    if (!recipe) return res.status(403).json({ message: 'Not allowed' });

    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


//user all Recipe
// controllers/recipeController.js


exports.getMyRecipes = async (req, res) => {
  try {
    // Assuming 'postedBy' stores ( use req.user.id if you're storing ObjectId)
    const recipes = await Recipe.find({ postedBy: req.user.id  }).populate('postedBy', 'name');;
    //  console.log('User recipes:', recipes);
    res.status(200).json(recipes);
  } catch (err) {
    console.error('Error fetching user recipes:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get a single recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('postedBy', 'name');

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
