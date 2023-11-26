const express = require("express");
const {
  _verifyUser,
  _signInAdmin,
  _getVoters,
  _getVoter,
} = require("../controllers/admin/AuthController");
const { pinFile } = require("../controllers/pinata/Pinata");

const AdminRoute = express.Router();

AdminRoute.post("/sign-in", _signInAdmin);
AdminRoute.put("/verify-voter", _verifyUser);
AdminRoute.get("/get-voters", _getVoters);
AdminRoute.get("/get-voter", _getVoter);
AdminRoute.post("/pin-file", pinFile);

module.exports = AdminRoute;
