const User = require("../models/userModel");
const APIFeatures = require("../util/APIFeatures");

const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./../modules/replaceTemp');

const templateOverview = fs.readFileSync(`${__dirname}/./../views/template-overview.html`, 'utf-8');
const templateForm = fs.readFileSync(`${__dirname}/./../views/template-form.html`, 'utf-8');
const templateUsers = fs.readFileSync(`${__dirname}/./../views/template-users.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/./../database/users.json`, 'utf-8');
const dataObj = JSON.parse(data);

exports.replaceTemp = async (req, res) => {
    res.end(templateOverview)
}

exports.replaceForm = async (req, res) => {
  const pathName = req.url;
  const indexHtml = dataObj.map(el => replaceTemplate(templateUsers, el)).join('');
  const output = templateForm.replace('{%USER_CARDS%}', indexHtml)
  res.end(output)
}