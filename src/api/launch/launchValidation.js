const Joi = require("@hapi/joi");

const getLaunches = {
  query: Joi.object().keys({
    search: Joi.string(),
    page: Joi.string(),
    limit: Joi.string(),
    sort: Joi.string(),
    filterBy: Joi.string().valid("pastLaunches", "upcommingLaunches", "latestLaunches")
  })
};

module.exports = {
  getLaunches
};
