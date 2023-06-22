const { getQueryOptions } = require("../../utils/serviceUtils");
const { Launch } = require("../../models/index");

const getLaunches = async (query) => {
  const { search, filterBy } = query;
  const { limit, skip, sort } = getQueryOptions(query);
  const searchFilter = {};
  if (search) {
    const searchFields = ["shipId", "mission_name"];
    searchFilter.$or = searchFields.map((field) => ({
      [field]: { $regex: search.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), $options: "i" }
    }));
  }
  if (filterBy === "pastLaunches") {
    searchFilter.launchDate = { $lt: new Date() };
  }
  if (filterBy === "upcommingLaunches") {
    searchFilter.launchDate = { $gt: new Date() };
  }
  if (filterBy === "latestLaunches") {
    searchFilter.launchDate = { $eq: new Date() };
  }
  return await Launch.aggregate([
    { $match: searchFilter },
    { $sort: sort },
    { $skip: parseInt(skip, 10) },
    { $limit: parseInt(limit, 10) }
  ]);
};

module.exports = {
  getLaunches
};
