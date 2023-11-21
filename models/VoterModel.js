const mongoose = require("mongoose");

const VoterModel = mongoose.Schema({
  voterWalletAddress: {
    type: String,
    required: [true, "Please add a Wallet Address"],
    unique: true,
  },
  fullName: {
    type: String,
    required: [true, "Please Full Name is required"],
  },
  country: {
    type: String,
    required: [true, "Please, Add a country"],
  },
  voterID: {
    type: String,
    required: [true, "Please, voter ID is required"],
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Please add a phone number"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is  required"],
    min: 6,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const Voter = mongoose.model("voters", VoterModel);
module.exports = Voter;
