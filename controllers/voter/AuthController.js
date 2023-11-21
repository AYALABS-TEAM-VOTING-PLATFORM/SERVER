const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Voter } = require("../../models/VoterModel");

const saltRounds = 10;
let privateKey = "secret";

const _signInUser = async (req, res) => {
  try {
    const { voterWalletAddress, name, country, ID, phoneNumber } = req.body;

    if (!voterWalletAddress || !name || !country || !ID || !phoneNumber) {
      return res
        .status(400)
        .json({ message: "Please all fields are required", status: 400 });
    }

    if (password.length >= 6) {
      return res.status(400).json({
        message: "Passwords characters must be more than 5",
        status: 400,
      });
    }

    const isValidWalletAddress = true;

    if (!isValidWalletAddress) {
      return res.status(400).json({
        message: "Passwords characters must be more than 5",
        status: 400,
      });
    }

    let token = jwt.sign(
      { userId: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      privateKey
    );

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);

    const voter = new Voter({
      voterWalletAddress,
      name,
      country,
      ID,
      phoneNumber: hashPassword,
    });
    voter.save();

    return res.status(201).json({
      message: "Successfully created a voter",
      voter,
      token,
      status: 200,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error });
  }
};

const _loginUser = async (req, res) => {
  try {
    const { userWalletAddres, password } = req.body;

    const voterDetail = await Voter.find({
      userWalletAddres: userWalletAddres,
    });

    if (!voterDetail)
      return res.status(404).json({ message: "User Doesnt exist" });

    const isPasswordCorrect = bcrypt.compareSync(password, user.voterDetail);

    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Password Is not correct" });

    let token = jwt.sign(
      { userId: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      privateKey
    );

    return res.status(201).json({
      message: "Successfully login voter",
      token,
      status: 200,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error });
  }
};

module.exports = { _signInUser, _loginUser };
