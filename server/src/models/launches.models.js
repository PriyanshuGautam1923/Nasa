const axios = require("axios").default;


const launchesDatabase = require("./launches.mongo");
const DEFAULT_FLIGHT_NUMBER = 100;

const populateLaunches = async function(){
  const response = await axios.post(
    "https://api.spacexdata.com/v4/launches/query",{
        "query": {},
        "options": {
            "pagination": false,
            "populate": [{
                "path": "rocket",
                "select": {
                    "name": 1
                }
            },
            {
                "path": "payloads",
                "select": {
                "customers": 1
                }
            }]
        }
    });
  const launchData = response.data.docs;
  const spaceXLaunches = launchData.map((launch) => {
    const customers = launch.payloads.flatMap(
      (launchPayload) => launchPayload.customers
    );
    return {
      flightNumber: launch.flight_number,
      mission: launch.name,
      rocket: launch.rocket.name,
      launchDate: launch.date_local,
      customers,
      upcoming: launch.upcoming,
      success: launch.success,
    };
  });
  // console.log(spaceXLaunches);
  for(const launch of spaceXLaunches)
   await saveLaunch(launch)
};
const loadLaunchesData = async function () {
  console.log("Checking if Data Preloaded from SpaceX API");
  const firstLaunch = await findLaunch({flightNumber: 1,rocket: "Falcon 1", mission: "FalconSat"});
  if(firstLaunch){
    console.log("Data Found");
    return;
  }
  await populateLaunches();
};
const findLaunch = async function(filter){
  await launchesDatabase.findOne(filter);
};
const getLatestFlightNumber = async function () {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");

  if (!latestLaunch) return DEFAULT_FLIGHT_NUMBER;
  return latestLaunch.flightNumber;
};
const saveLaunch = async function (launch) {
  await launchesDatabase.updateOne(
    { flightNumber: launch.flightNumber },
    launch,
    {
      upsert: true,
    }
  );
};

const getAllLaunches = async function (query) {
  let {limit, page} = query;
  limit=Number(limit) || 20;
  page=Number(page) || 2;
  return await launchesDatabase.find({}).sort({flightNumber: 1}).skip((page-1)*limit).limit(limit);
};

const scheduleNewLaunch = async function (launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["ZTM", "NASA"],
    flightNumber: newFlightNumber,
  });
  // console.log(launch);
  await saveLaunch(newLaunch);
  // console.log(launch);
};
const deleteLaunch = async function (id) {
  const modifiedId = Number(id);
  const hasLaunchWithId = await launchesDatabase.findOne({
    flightNumber: modifiedId,
  });
  if (!hasLaunchWithId) {
    console.log("not found");
    return { ok: false };
  }
  await launchesDatabase.updateOne(
    { flightNumber: modifiedId },
    { upcoming: false, success: false }
  );
  return { ok: true };
};
module.exports = {
  loadLaunchesData,
  getAllLaunches,
  scheduleNewLaunch,
  deleteLaunch,
};
