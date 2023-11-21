// Importing required modules
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Voter = require("../../models/VoterModel");

// Configuration
const SALT_ROUNDS = 10;
const PRIVATE_KEY = "secret";

// Function to sign up a new voter
const signUpUser = async (req, res) => {
  try {
    const { voterWalletAddress, fullName, country, ID, phoneNumber, password } =
      req.body;

    // Validating presence of required fields
    if (!voterWalletAddress || !fullName || !country || !ID || !phoneNumber) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields", status: 400 });
    }

    // Validating password length
    if (password.length <= 5) {
      return res.status(400).json({
        message: "Password must be more than 5 characters",
        status: 400,
      });
    }

    // Additional validation (replace this with your actual validation logic)
    const isValidWalletAddress = true;

    if (!isValidWalletAddress) {
      return res
        .status(400)
        .json({ message: "Additional validation failed", status: 400 });
    }

    // Hashing the password using bcrypt
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hashPassword = bcrypt.hashSync(password, salt);

    // Creating a new Voter instance and saving it to the database
    const voter = new Voter({
      voterWalletAddress,
      fullName,
      country,
      voterID: ID,
      phoneNumber,
      password: hashPassword,
    });
    await voter.save();

    // Generating a JWT token for the newly created voter
    const token = jwt.sign(
      { voterId: voter.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      PRIVATE_KEY
    );

    // Sending a success response with voter details and token
    return res.status(201).json({
      message: "Successfully created a voter",
      voter,
      token,
      status: 200,
    });
  } catch (err) {
    console.error(err);
    // Handling errors and sending an error response with details
    return res
      .status(500)
      .json({ message: "Something went wrong", err: JSON.stringify(err) });
  }
};

// Function to login an existing voter
const loginUser = async (req, res) => {
  try {
    const { voterWalletAddress, password } = req.body;

    // Finding the voter in the database based on wallet address
    const voterDetail = await Voter.findOne({ voterWalletAddress });

    // Handling the case when the voter doesn't exist
    if (!voterDetail) {
      return res
        .status(404)
        .json({ message: "User doesn't exist", status: 404 });
    }

    // Comparing the provided password with the hashed password in the database
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      voterDetail.password
    );

    // Handling incorrect password
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ message: "Password is not correct", status: 401 });
    }

    // Generating a JWT token for the logged-in voter
    const token = jwt.sign(
      { voterId: voterDetail.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      PRIVATE_KEY
    );

    // Sending a success response with voter details, token, and status
    return res.status(201).json({
      message: "Successfully login voter",
      token,
      voter: voterDetail,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    // Handling errors and sending an error response with details
    return res
      .status(500)
      .json({ message: "Something went wrong", err: JSON.stringify(error) });
  }
};

// Exporting the signup and login functions for use in other files
module.exports = { signUpUser, loginUser };
