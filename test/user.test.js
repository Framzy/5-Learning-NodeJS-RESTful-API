// making unit test with jest and supertest

import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/users", function () {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "farden",
      },
    });
  });

  it("should can register new user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "farden",
      password: "rahasia",
      name: "Farden Ramzy Muharram",
    });

    logger.info(result.body);

    expect(result.statusCode).toBe(200);
    expect(result.body.data.username).toBe("farden");
    expect(result.body.data.name).toBe("Farden Ramzy Muharram");
    expect(result.body.data.password).toBeUndefined();
  });

  it("should reject if request body is invalid", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    logger.info(result.body);

    expect(result.statusCode).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if username already exists", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "farden",
      password: "rahasia",
      name: "Farden Ramzy Muharram",
    });

    logger.info(result.body);

    expect(result.statusCode).toBe(200);
    expect(result.body.data.username).toBe("farden");
    expect(result.body.data.name).toBe("Farden Ramzy Muharram");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post("/api/users").send({
      username: "farden",
      password: "rahasia",
      name: "Farden Ramzy Muharram",
    });

    logger.info(result.body);

    expect(result.statusCode).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
