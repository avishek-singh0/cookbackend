const express = require('express')
const router = express.Router();
const authController = require('./../controller/auth')



//auth.js
router.post('/sign', authController.signup);
router.post('/login', authController.login);



module.exports = router;