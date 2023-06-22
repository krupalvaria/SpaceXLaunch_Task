const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const launchController = require("./launchController");
const launchValidation = require("./launchValidation");

const Router = express.Router();

Router.get("/storeLaunches", auth, launchController.storeLaunches);

Router.get("/getLaunches", auth, validate(launchValidation.getLaunches), launchController.getLaunches);

module.exports = Router;
