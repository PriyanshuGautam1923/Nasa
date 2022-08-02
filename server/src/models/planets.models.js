const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");
const planets = require("./planets.mongo");

const isHabitable = function (data) {
  return (
    data.koi_disposition === "CONFIRMED" &&
    data.koi_insol > 0.36 &&
    data.koi_insol < 1.11 &&
    data.koi_prad < 1.6
  );
};
const savePlanets = async function (data) {
  try {
    await planets.updateOne(
      { keplerName: data.kepler_name },
      { keplerName: data.kepler_name },
      { upsert: true }
    );
  } catch (err) {
    console.error(`Something Went Wrong ${err}`);
  }
};
const loadPlanets = function () {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "..", "data", "data.csv"))
      .pipe(parse({ comment: "#", columns: true }))
      .on("data", (data) => {
        if (isHabitable(data)) savePlanets(data);
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        console.log(`${(await getAllPlanets()).length} DONE`);
        resolve();
      });
  });
};

const getAllPlanets = async function () {
  return await planets.find({});
};
module.exports = {
  getAllPlanets,
  loadPlanets,
};
