const express = require("express");
const cors = require("cors");
const httpStatus = require("http-status");

const routes = require("./route");
const ErrorHandler = require("./utils/ErrorHandler");
const { handleError } = require("./middlewares/error");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

app.get("/api", (req, res) => {
  res.send("Welcome to Chatgpt-API.");
});
app.use("/", routes);

app.use((err, req, res, _next) => {
  handleError(err, res);
});

app.use((req, res, next) => {
  next(new ErrorHandler(httpStatus.NOT_FOUND, "API request not found."));
});

module.exports = app;
