const { validationResult } = require("express-validator");
const HttpError = require("../model/http-error");
const user = require("../model/user");
const User = require("../model/user");

const getUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError("Fetching user failed", 500);
    return next(error);
  }

  res.json({ user: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  console.log(errors);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed", 422));
  }

  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signing up failed", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("User exists", 422);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed", 500);
    return next(error);
  }

  res.status(200).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Logging failed", 500);
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError("Invalid credentials", 401);
    return next(error);
  }

  res.status(200).json({ user: existingUser.toObject({ getters: true }) });
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  let user;

  try {
    user = await User.findById(userId);
  } catch (error) {
    console.log(error);
    return error;
  }

  if (!user) {
    const error = new HttpError("no user for id", 404);
    return next(error);
  }

  try {
    user.remove();
  } catch (error) {
    console.log(error);
    return error;
  }

  res.status(200).json({ message: "Deleted user." });
};

const updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { name, email } = req.body;
  const userId = req.params.id;

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    console.log(error);
    return error;
  }

  user.name = name;
  user.email = email;

  try {
    await user.save();
  } catch (error) {
    console.log(error);
    return error;
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
