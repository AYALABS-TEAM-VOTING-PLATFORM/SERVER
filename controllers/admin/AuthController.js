const jwt = require("jsonwebtoken");
const Voter = require("../../models/VoterModel");

// Constants
const ADMIN_PASSWORD = "adminPassword123"; // Admin password (Consider using environment variables for better security)
const WALLET_ADDRESS = "0x558A03Ea3052620c34D12fA3A1500EbA7D135bE9"; // Admin wallet address
const TOKEN_EXPIRATION_SECONDS = 60 * 60; // Token expiration time in seconds (1 hour)
const PRIVATE_KEY = "secret";

// Function to verify a user
const _verifyUser = async (req, res) => {
  try {
    const { walletAddress } = req.query;

    // Update the voter's verification status in the database
    await Voter.updateOne(
      { voterWalletAddress: walletAddress },
      { $set: { verified: true } }
    );

    // Send a success response
    return res.status(201).json({
      message: "Successfully Verified",
      status: 201,
    });
  } catch (error) {
    // Handle errors and send an error response with details
    return res
      .status(500)
      .json({ message: "Failed to verify user", error: JSON.stringify(error) });
  }
};

// Function to sign in an admin
const _signInAdmin = async (req, res) => {
  try {
    const { adminWalletAddress, password } = req.body;

    // Check if the provided password and wallet address match the admin's credentials
    const isPasswordCorrect = ADMIN_PASSWORD === password;
    const isValidWalletAddress = adminWalletAddress === WALLET_ADDRESS;

    // If credentials are not correct, send an unauthorized response
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid password" });

    if (!isValidWalletAddress)
      return res.status(401).json({ message: "Invalid wallet address" });

    // Generate a JWT token for the admin
    let token = jwt.sign(
      {
        adminWalletAddress: adminWalletAddress,
        exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRATION_SECONDS,
      },
      PRIVATE_KEY
    );

    // Send a success response with the token
    return res.status(200).json({
      message: "Successfully logged in admin",
      token,
      status: 200,
    });
  } catch (error) {
    // Handle errors and send an error response with details
    return res.status(500).json({
      message: "Failed to log in admin",
      error: JSON.stringify(error),
    });
  }
};

// Function to get all voters
const _getVoters = async (req, res) => {
  try {
    // Retrieve all voters from the database
    const voters = await Voter.find();

    // Send a success response with the voters data
    return res.status(200).json({
      message: "Successfully gotten voters",
      voters,
      status: 200,
    });
  } catch (error) {
    // Handle errors and send an error response with details
    return res
      .status(500)
      .json({ message: "Failed to get voters", error: JSON.stringify(error) });
  }
};

// Function to get a specific voter
const _getVoter = async (req, res) => {
  try {
    const { walletAddress } = req.query;

    // Retrieve a specific voter from the database based on wallet address
    const voters = await Voter.findOne({ voterWalletAddress: walletAddress });

    // Send a success response with the voter data
    return res.status(200).json({
      message: "Successfully gotten voter",
      voter: voters,
      status: 200,
    });
  } catch (error) {
    // Handle errors and send an error response with details
    return res
      .status(500)
      .json({ message: "Failed to get voter", error: JSON.stringify(error) });
  }
};

// Export all functions for use in other files
module.exports = { _verifyUser, _signInAdmin, _getVoters, _getVoter };
