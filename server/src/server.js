const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();

const { app } = require("./app");
const { loadPlanets } = require("./models/planets.models");
const { loadLaunchesData } = require("./models/launches.models");
const server = http.createServer(app);

const PORT = 5000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("Connection Established");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});
const startServer = async function () {
  await mongoose.connect(MONGO_URL);
  await loadPlanets();
  await loadLaunchesData();
  server.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
};
startServer();
