const express = require("express");
const validate = require("../../middlewares/validate");
const authController = require("./authController");
const authValidation = require("./authValidation");

const Router = express.Router();

Router.post("/login", validate(authValidation.login), authController.login);

Router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);

module.exports = Router;
