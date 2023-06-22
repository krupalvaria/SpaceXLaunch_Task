const express = require("express");
const authRoute = require("../api/auth/authRoute");
const launchRoute = require("../api/launch/launchRoute");

const Router = express.Router();

Router.use("/auth", authRoute);

Router.use("/launch", launchRoute);

module.exports = Router;
