const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getUsers = async (req, res) => {
  const { id } = req.query;

  if (id) {
    const user = await User.findById(id);
    return res.json(user);
  }
  const users = await User.find();
  res.json(users);
};

exports.getUsersById = async (req, res) => {

  //  const id = req.params.id;
  const id = req.query.id;
  const users = await User.findById(id);

  res.json(users);
};