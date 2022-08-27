const path = require('path');
const express = require("express");
const app = express();

const userRoute = require("./src/routes/userRoutes");

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src/views')); 
app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/index', userRoute);

app.use(express.json());
app.use("/api/v1/users", userRoute);


module.exports = app; 