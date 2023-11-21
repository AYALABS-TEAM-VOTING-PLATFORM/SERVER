const express = require("express");
const {
  _signInUser,
  _loginUser,
} = require("../controllers/voter/AuthController");

const voterRoute = express.Router();

voterRoute.post("/sign-in", _signInUser);
voterRoute.post("/sign-up", _loginUser);

module.exports = voterRoute;
