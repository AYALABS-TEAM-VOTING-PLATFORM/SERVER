const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Voter = require("../../models/VoterModel");

const saltRounds = 10;
let privateKey = "secret";

const _sigUpnUser = async (req, res) => {
  try {
    const { voterWalletAddress, fullName, country, ID, phoneNumber, password } =
      req.body;

    if (!voterWalletAddress || !fullName || !country || !ID || !phoneNumber) {
      return res
        .status(400)
        .json({ message: "Please all fields are required", status: 400 });
    }

    if (password.length <= 6) {
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

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);

    const voter = new Voter({
      voterWalletAddress,
      fullName,
      country,
      voterID: ID,
      phoneNumber: phoneNumber,
      password: hashPassword,
    });
    voter.save();

    let token = jwt.sign(
      { voterId: voter.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      privateKey
    );
    return res.status(201).json({
      message: "Successfully created a voter",
      voter,
      token,
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong", err: JSON.stringify(err) });
  }
};

const _loginUser = async (req, res) => {
  try {
    const { voterWalletAddress, password } = req.body;

    const voterDetail = await Voter.findOne({
      voterWalletAddress: voterWalletAddress,
    });

    if (!voterDetail)
      return res.status(404).json({ message: "User Doesnt exist" });

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      voterDetail.password
    );

    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Password Is not correct" });

    let token = jwt.sign(
      { voterId: voterDetail.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      privateKey
    );

    return res.status(201).json({
      message: "Successfully login voter",
      token,
      voter: voterDetail,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", err: JSON.stringify(error) });
  }
};

module.exports = { _sigUpnUser, _loginUser };
