const express = require("express");
const {
  signUpUser,
  loginUser,
} = require("../controllers/voter/AuthController");

const voterRoute = express.Router();
const app = express();

voterRoute.post("/sign-up", signUpUser);
voterRoute.post("/sign-in", loginUser);

app.get("/", (req, res) => {
  res.send("App Running");
});

module.exports = voterRoute;
