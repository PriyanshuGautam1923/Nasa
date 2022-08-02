const request = require("supertest");
const { app } = require("../../app");
describe("TEST GET /launches", () => {
  test("It should respond with status code 200 success", async () => {
    const response = await request(app).get("/v1/launches").expect(200);
  });
});
const completeLaunchData = {
  mission: "USS Enterprise",
  rocket: "NCC-1701 D",
  target: "Kepler-186 f",
  launchDate: "January 4, 2028",
};
const completeLaunchDataWithoutDate = {
  mission: "USS Enterprise",
  rocket: "NCC-1701 D",
  target: "Kepler-186 f",
};
const completeLaunchDataWithInvalidDate = {
  mission: "USS Enterprise",
  rocket: "NCC-1701 D",
  target: "Kepler-186 f",
  launchDate: "zoot",
};
describe("TEST POST /launches", () => {
  test("It should respond with status code 201 success", async () => {
    const response = await request(app)
      .post("/v1/launches")
      .send(completeLaunchData)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(response.body).toMatchObject(completeLaunchDataWithoutDate);
    expect(requestDate).toBe(responseDate);
  });
  test("It should check for missing launch property", async () => {
    const response = await request(app)
      .post("/v1/launches")
      .send(completeLaunchDataWithoutDate)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });
  test("It should check for valid dates", async () => {
    const response = await request(app)
      .post("/v1/launches")
      .send(completeLaunchDataWithInvalidDate)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid Date",
    });
  });
});
