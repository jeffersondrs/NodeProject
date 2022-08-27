const User = require("../models/userModel");
const APIFeatures = require("../util/APIFeatures");

const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./../modules/replaceTemp');

const templateOverview = fs.readFileSync(`${__dirname}/./../views/template-overview.html`, 'utf-8');
const templateUserCard = fs.readFileSync(`${__dirname}/./../views/template-user-card.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/./../database/users.json`, 'utf-8')
const dataObj = JSON.parse(data);


exports.getUsers = async (req, res) => {
    try {
      // EXECUTE QUERY
      const features = new APIFeatures(User.find(), req.query).filter().sort();
  
      const users = await features.query;
  
      // SEND RESPONSE
      res.status(200).json({
        status: "success",
        results: users.length,
        data: {
          users: users,
        }
        
      });
    } catch (err) {
      res.status(404).json({
        status: "falha",
        message: err.message,
      });
    }
  };

exports.replaceTemp = async (req, res) => {
    const pathName = req.url;
    const indexHtml = dataObj.map(el => replaceTemplate(templateUserCard, el)).join('');
    const output = templateOverview.replace('{%CARDUSER%}', indexHtml)
    res.end(output)
    
    // res.status(200).render('template-user-card');
}
