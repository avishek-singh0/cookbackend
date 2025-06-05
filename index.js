
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE

mongoose.connect(DB).then(() => {
    console.log('Connected to Mongodb ')
})

const app = require("./app");
const PORT = process.env.PORT || 5001
app.listen(PORT,()=>console.log(`Server is running on ${PORT}`));