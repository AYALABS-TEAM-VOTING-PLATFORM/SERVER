const express = require("express");
const {
  _sigUpnUser,
  _loginUser,
} = require("../controllers/voter/AuthController");

const voterRoute = express.Router();

voterRoute.post("/sign-up", _sigUpnUser);
voterRoute.post("/sign-in", _loginUser);

module.exports = voterRoute;
