const mongoose = require("mongoose");

const app = require("./app");
const config = require("./config/config");
const logger = require("./config/logger");

mongoose.set("strictQuery", true);

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info("Connected to MongoDB.");
  server = app.listen(config.port, () => {
    logger.info(`we are listaning to the port number ${config.port}`);
  });
}).catch((err) => {
  logger.error(err.message);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info(" received");
  if (server) {
    server.close();
  }
});
