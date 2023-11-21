const express = require("express");
const {
  _verifyUser,
  _signInAdmin,
  _getVoters,
  _getVoter,
} = require("../controllers/admin/AuthController");

const AdminRoute = express.Router();

AdminRoute.post("/sign-in", _signInAdmin);
AdminRoute.put("/verify-voter", _verifyUser);
AdminRoute.get("/get-voters", _getVoters);
AdminRoute.get("/get-voter", _getVoter);

module.exports = AdminRoute;
