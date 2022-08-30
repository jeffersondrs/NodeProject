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
const templateUser = fs.readFileSync(`${__dirname}/./../views/template-user.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/./../database/users.json`, 'utf-8');
const dataObj = JSON.parse(data);
const dataUser = fs.readFileSync(`${__dirname}/./../database/user.json`, 'utf-8');
const userObj = JSON.parse(dataUser);

exports.replaceTemp = async (req, res) => {
    res.end(templateOverview)
}

exports.replaceForm = async (req, res) => {
  const pathName = req.url;
  const indexHtml = await dataObj.map(el => replaceTemplate(templateUsers, el)).join('');
  const output = templateForm.replace('{%USER_CARDS%}', indexHtml)
  res.end(output)
}

exports.replaceUser = async (req, res) => {
  const pathName = req.url;
  const indexHtml = await userObj.map(el => replaceTemplate(templateUsers, el)).join('');
  const output = templateUser.replace('{%USER_CARD%}', indexHtml)
  res.end(output)
}