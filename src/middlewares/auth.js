const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const Messages = require("../utils/messages");

const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      next(new ErrorHandler(httpStatus.UNAUTHORIZED, Messages.TOKEN_NOT_FOUND));
    } else {
      const token = req.headers.authorization;
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err && err.name === "TokenExpiredError") {
          next(new ErrorHandler(httpStatus.UNAUTHORIZED, Messages.TOKEN_EXPIRED));
        } else if (err && err.name === "JsonWebTokenError") {
          next(new ErrorHandler(httpStatus.UNAUTHORIZED, Messages.INVALID_TOKEN));
        } else {
          req.admin = decoded;
          next();
        }
      });
    }
  } catch (error) {
    res.status(400).send(Messages.INVALID_TOKEN);
  }
};

module.exports = auth;
