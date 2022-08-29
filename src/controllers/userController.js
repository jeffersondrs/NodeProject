const fs = require('fs');
const User = require("../models/userModel");
const APIFeatures = require("../util/APIFeatures");

exports.getAllUsers = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort();

    const users = await features.query;
    const dataObj = JSON.stringify(users);
    fs.writeFileSync(`${__dirname}/../database/users.json`, dataObj)

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users: users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "falha",
      message: err.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort();

    const users = await features.query;
    const dataObj = JSON.stringify(users);
    fs.writeFileSync(`${__dirname}/../database/users.json`, dataObj)

    res.status(201).json({ status: "success", data: { user: newUser } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort();

    const users = await features.query;
    const dataObj = JSON.stringify(users);
    fs.writeFileSync(`${__dirname}/../database/users.json`, dataObj)

    res.status(204).json({
      status: "sucess",
      data: null,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort();

    const users = await features.query;
    const dataObj = JSON.stringify(users);
    fs.writeFileSync(`${__dirname}/../database/users.json`, dataObj)

    res.status(200).json({ status: "success", data: { user } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
