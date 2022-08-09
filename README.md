# Space Shuttle Launch Scheduler

## Project Description

This project uses Nasa's Exoplanetary data, SpaceX RESTful API and Awares library to build an end to end launch scheduler. The app is built using the MERN stack and REST architecture.

## Installing Instructions

- Setup a MongoDB database on the Mongo Atlas.

- Replace the URL present in the .env file with the one created above

Run the following commands sequentially:<br />

```bash
npm run install
npm run deploy
```

You can lookup _package.json_ file in the root directory for more useful commands.

## Usage Instructions

- You can schedule a launch at the landing page of the app.
- You can lookup for upcoming launches in the upcoming tab.
- Also the history tab contains your past launches as well as the launches from the SpaceX API.
- You can specify the _limit_ & _Page_ parameters in the URL of the upcoming page to enforce pagination.

## Further Improvements

- Employing Pagination at frontend using user inputs.
- Adding the input currosponding to adding partnering companies in launches.
  <br />

---

<h1 align="center">Thankyou</h1>
