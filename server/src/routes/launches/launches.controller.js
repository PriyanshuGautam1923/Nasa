const {
  getAllLaunches,
  scheduleNewLaunch,
  deleteLaunch,
} = require("../../models/launches.models");

const httpGetAllLaunches = async function (req, res) {
  console.log(req.query);
  res.status(200).json(await getAllLaunches(req.query));
};

const httpAddLaunch = async function (req, res) {
  const launch = req.body;
  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target)
    return res.status(400).json({ error: "Missing required launch property" });

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate))
    return res.status(400).json({ error: "Invalid Date" });
  // console.log(launch);
  await scheduleNewLaunch(launch);
  // console.log(launch);
  res.status(201).json(launch);
};

const httpDeleteLaunch = async function (req, res) {
  const id = req.params.id;
  const result = await deleteLaunch(id);
  if (result.hasOwnProperty("ok") && !result.ok)
    return res.status(404).json({ error: "Invalid Id" });
  return res.status(200).json(result);
};

module.exports = {
  httpGetAllLaunches,
  httpAddLaunch,
  httpDeleteLaunch,
};
