const express = require("express");
const {
  _signInAdmin,
  _verifyUser,
} = require("../controllers/admin/AuthController");

const AdminRoute = express.Router();

AdminRoute.post("/sign-in", _signInAdmin);
AdminRoute.put("/verify-voter", _verifyUser);

module.exports = AdminRoute;
