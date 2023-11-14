import request from "supertest";

// import app from "../";

describe("Server and routes tests", () => {
	test("OS api/ping Route", async () => {
		const res = await request(app).get("/client/os/system/api/ping");
		expect(res.body).toEqual({ message: "Pong!" });
	});
});
