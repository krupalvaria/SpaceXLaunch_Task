const mongoose = require("mongoose");

const launchSchema = new mongoose.Schema({
  shipId: String,
  launchDate: Date,
  launchYear: Number,
  mission_name: String,
  launch_success: Boolean
});

const Launch = mongoose.model("Launch", launchSchema);

module.exports = Launch;
