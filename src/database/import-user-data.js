/* eslint-disable no-console *//* eslint-disable prettier/prettier */
const fs = require('fs');
const mongoose = require('mongoose'); 
const dotenv = require('dotenv');
const User = require('./../models/userModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, { // connect to the database
  useNewUrlParser: true,
}).then(con => {
  console.log(`DB connection successful: ${con.connection.host}`);
})

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

const importData = async () => {
    try {
        await User.create(users);
        console.log('Data successfully loaded!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
    };

    const deleteData = async () => {
        try {
            await User.deleteMany();
            console.log('Data successfully deleted!');
            process.exit();
        } catch (err) {
            console.log(err);
        }
        process.exit();
    }
 
    if (process.argv[2] === '--import') {
        importData();
    } else if (process.argv[2] === '--delete') {
        deleteData();
    } else {
        console.log('Please provide a valid argument');
    }

 console.log(process.argv);