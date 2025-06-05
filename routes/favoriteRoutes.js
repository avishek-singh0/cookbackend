const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth');
const favoriteController = require('../controller/favoriteController');


// routes/favoriteRoutes.js
router.post('/:recipeId', auth.authenticateToken,favoriteController.addFavorite);

router.delete('/:recipeId',auth.authenticateToken,  favoriteController.removeFavorite);

router.get('/all',auth.authenticateToken,  favoriteController.getFavorites);



module.exports = router;