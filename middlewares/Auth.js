const jsonwebtoken = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const checkAuth = async (req, res, next) => {
  // get the token from the headers
  // check if theres is a token
  // verify the token if it hasnt expired
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  let tokenFinal = token.toString().split(" ")[1];

  // Check if the token exists and has not expired
  jsonwebtoken.verify(tokenFinal, privateKey, (error, token) => {
    if (token) {
      res.userId = token.userId;
      next();
    } else {
      console.log(error);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  });
};

module.exports = { checkAuth };
