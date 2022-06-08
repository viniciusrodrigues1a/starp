import { Server } from "@/main/Server";
import { connection } from "@/shared/infrastructure/database/connection";
import request from "supertest";

const server = new Server();

describe("GET /podcasts/most-listened", () => {
  afterEach(async () => {
    connection.podcast.deleteMany();
  });

  it("should return 200", async () => {
    const res = await request(server.app).get("/podcasts/most-listened");
    expect(res.statusCode).toEqual(200);
  });
});
