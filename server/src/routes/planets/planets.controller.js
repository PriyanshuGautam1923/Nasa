const { getAllPlanets } = require("../../models/planets.models");

const httpGetAllPlanets = async function (req, res) {
  res.status(200).json(await getAllPlanets());
};

module.exports = {
  httpGetAllPlanets,
};
