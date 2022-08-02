const express = require("express");

const { planetsRouter } = require("./planets/planets.router");
const { launchesRoutes } = require("./launches/launches.router");

const apiRouter = express.Router();

apiRouter.use("/planets", planetsRouter);
apiRouter.use("/launches", launchesRoutes);

module.exports = { apiRouter };
