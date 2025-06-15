
const User = require('../models/user');

exports.addFavorite = async (req, res) => {
  const userId = req.user.id;
  const recipeId = req.params.recipeId;

  try {
    const user = await User.findById(userId);

    if (!user.favorites.includes(recipeId)) {
      user.favorites.push(recipeId);
      await user.save();
    }

    res.status(200).json({ message: 'Recipe added to favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to favorites' });
  }
};



exports.removeFavorite = async (req, res) => {
  const userId = req.user.id;
  const recipeId = req.params.recipeId;

  try {
    const user = await User.findById(userId);
    user.favorites = user.favorites.filter(id => id.toString() !== recipeId);
    await user.save();

    res.status(200).json({ message: 'Recipe removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from favorites' });
  }
};




exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites' });
  }
};
