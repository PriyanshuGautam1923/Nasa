const API_URL_V1 = "http://localhost:5000/v1";

// Load planets and return as JSON.
async function httpGetPlanets() {
  const response = await fetch(`${API_URL_V1}/planets`);
  return await response.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches(limit, page) {
  const response = await fetch(
    `${API_URL_V1}/launches?limit=${limit}&page=${page}`
  );
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL_V1}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (error) {
    return { ok: false };
  }

  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL_V1}/launches/${id}`, {
      method: "delete",
    });
  } catch (error) {
    return { ok: false };
  }
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
