const express = require("express");
const cors = require('cors');
const userRoute = require('./routes/user');
const recipeRoute = require('./routes/recipe');
const favoriteRoute = require('./routes/favoriteRoutes');
const app = express();


// Middleware

app.use(cors());
app.use(express.json());

app.get('/jobs', (req, res) => {
  res.send('Backend is awake');
});


// Mounting routes
app.use('/user',userRoute);
app.use('/recipe',recipeRoute)
app.use('/favorite', favoriteRoute);


app.use((req, res, next) => {
    console.log('Hello from Middleware ');
    next();
});



module.exports = app;