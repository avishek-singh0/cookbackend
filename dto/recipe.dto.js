const { z } = require('zod');

const createRecipeSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  instructions: z.string().min(5, 'Instructions are too short'),
  thumbnail: z.string().url('Invalid thumbnail URL'),
  
  ingredients: z.array(z.string().min(1, 'Ingredient must not be empty')).min(1, 'At least one ingredient required')
});

module.exports = { createRecipeSchema };
