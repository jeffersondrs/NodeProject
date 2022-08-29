const path = require('path');
const express = require("express");
const bodyParser = require('body-parser')
const app = express();

const userRoute = require("./src/routes/userRoutes");

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src/views')); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(bodyParser.urlencoded({ extended: true }))


app.use(express.json());
app.use("/api/v1/user", userRoute);
app.get('/api/v1/user/index', userRoute).post('/api/v1/users/form', userRoute);


module.exports = app; 