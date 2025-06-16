const { z } = require('zod');

const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const loginUserSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password is required')
});

module.exports = { createUserSchema, loginUserSchema };



