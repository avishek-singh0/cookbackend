const express = require('express')
const router = express.Router();
const authController = require('./../controller/auth')
const { createUserSchema, loginUserSchema } = require('../dto/user.dto');
const validateDto = require('../middleware/validateDto');


//auth.js
router.post('/sign',validateDto(createUserSchema), authController.signup);
router.post('/login',validateDto(loginUserSchema), authController.login);



module.exports = router;