const httpStatus = require("http-status");
const { handleError } = require("../../middlewares/error");
const Messages = require("../../utils/messages");
const createResponse = require("../../utils/response");
const launchService = require("./launchService");
const Launch = require("../../models/launch.model");

const storeLaunches = async (req, res) => {
  try {
    const url = "https://api.spacexdata.com/v3/launches";
    const response = await fetch(url);
    const jsonResponse = await response.json();
    const launchList = jsonResponse.map((value) => {
      const obj = {
        shipId: value.flight_number,
        launchDate: value.launch_date_utc,
        launchYear: value.launch_year,
        mission_name: value.mission_name,
        launch_success: value.launch_success
      };
      const createLaunch = Launch.findOneAndUpdate({ shipId: value.flight_number }, obj, { upsert: true });
      return createLaunch;
    });
    Promise.all(launchList)
      .then((result) => createResponse(res, httpStatus.OK, Messages.LUNCHDATA_SUCCESSFULLY, result));
  } catch (error) {
    handleError(error, res);
  }
};

const getLaunches = async (req, res) => {
  try {
    const users = await launchService.getLaunches(req.query);
    createResponse(res, httpStatus.OK, Messages.LAUNCH_LIST, users);
  } catch (error) {
    handleError(error, res);
  }
};

module.exports = {
  storeLaunches,
  getLaunches
};
