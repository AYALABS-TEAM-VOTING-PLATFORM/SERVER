const jwt = require("jsonwebtoken");
const { Voter } = require("../../models/VoterModel");

let adminPassword = "adminPassword123";
let walletAddress = "0x558A03Ea3052620c34D12fA3A1500EbA7D135bE9";

const _verifyUser = async (req, res) => {
  try {
    const { walletAddress } = req.query;

    await Voter.updateOne(
      { voterWalletAddress: walletAddress },
      {
        $set: {
          verified: true,
        },
      }
    );

    return res.status(201).json({
      message: "Successfully Verified",
      status: 201,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error });
  }
};

const _signInAdmin = async (req, res) => {
  try {
    const { adminwalletAddres, password } = req.body;

    const isPasswordCorrect = adminPassword === password;
    const isValidWalletAddress = adminwalletAddres === walletAddress;

    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Password Is not correct" });

    if (!isValidWalletAddress)
      return res.status(401).json({ message: "Wallet Address Is not valid" });

    let token = jwt.sign(
      { userId: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      privateKey
    );

    return res.status(200).json({
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

module.exports = { _verifyUser, _signInAdmin };
