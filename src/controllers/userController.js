const User = require("../models/userModel");
const APIFeatures = require("../util/APIFeatures");

exports.getAllUsers = async (req, res) => {
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

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ status: "success", data: { user: newUser } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "sucess",
      data: null,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try{
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: 'success', data: { user } })

  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
}; 
