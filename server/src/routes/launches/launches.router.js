const express = require("express");
const {
  httpGetAllLaunches,
  httpAddLaunch,
  httpDeleteLaunch,
} = require("./launches.controller");

const launchesRoutes = express.Router();

launchesRoutes.get("/", httpGetAllLaunches);
launchesRoutes.post("/", httpAddLaunch);
launchesRoutes.delete("/:id", httpDeleteLaunch);

module.exports = {
  launchesRoutes,
};
