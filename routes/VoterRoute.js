const express = require("express");
const {
  signUpUser,
  loginUser,
} = require("../controllers/voter/AuthController");

const voterRoute = express.Router();

voterRoute.post("/sign-up", signUpUser);
voterRoute.post("/sign-in", loginUser);

module.exports = voterRoute;
