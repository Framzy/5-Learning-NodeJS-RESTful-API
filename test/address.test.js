import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import {
  createTestUser,
  createTestContact,
  removeAllTestAddresses,
  removeAllTestContacts,
  removeTestUser,
  getTestContact,
  createTestAddress,
  getTestAddress,
} from "./test-util.js";

describe("POST /api/contacts/:contactId/addresses", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can create address", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post("/api/contacts/" + testContact.id + "/addresses")
      .set("Authorization", "test") //header
      .send({
        street: "jalan test",
        city: "kota test",
        province: "provinsi test",
        country: "negara test",
        postal_code: "123 test",
      });

    logger.info(result.body);

    expect(result.statusCode).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("jalan test");
    expect(result.body.data.city).toBe("kota test");
    expect(result.body.data.province).toBe("provinsi test");
    expect(result.body.data.country).toBe("negara test");
    expect(result.body.data.postal_code).toBe("123 test");
  });

  it("should reject if address request is invalid", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post("/api/contacts/" + testContact.id + "/addresses")
      .set("Authorization", "test") //header
      .send({
        street: "jalan test",
        city: "kota test",
        province: "provinsi test",
        country: "",
        postal_code: "",
      });

    logger.info(result.body);

    expect(result.statusCode).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if contact not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .post("/api/contacts/" + (testContact.id + 1) + "/addresses")
      .set("Authorization", "test") //header
      .send({
        street: "jalan test",
        city: "kota test",
        province: "provinsi test",
        country: "negara test",
        postal_code: "123 test",
      });

    logger.info(result.body);

    expect(result.statusCode).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId/addresses/:addressId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can get address", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
      .set("Authorization", "test"); //header

    logger.info(result.body);

    expect(result.statusCode).toBe(200);
    expect(result.body.data.id).toBe(testAddress.id);
    expect(result.body.data.street).toBe(testAddress.street);
    expect(result.body.data.city).toBe(testAddress.city);
    expect(result.body.data.province).toBe(testAddress.province);
    expect(result.body.data.country).toBe(testAddress.country);
    expect(result.body.data.postal_code).toBe(testAddress.postal_code);
  });
});

describe("PUT /api/contacts/:contactId/addresses/:addressId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can update address", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
      .set("Authorization", "test") //header
      .send({
        street: "jalan",
        city: "kota",
        province: "provinsi",
        country: "negara",
        postal_code: "123",
      });

    logger.info(result.body);

    expect(result.statusCode).toBe(200);
    expect(result.body.data.id).toBe(testAddress.id);
    expect(result.body.data.street).toBe("jalan");
    expect(result.body.data.city).toBe("kota");
    expect(result.body.data.province).toBe("provinsi");
    expect(result.body.data.country).toBe("negara");
    expect(result.body.data.postal_code).toBe("123");
  });

  it("should reject if address request is invalid", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id + "/addresses/" + testAddress.id)
      .set("Authorization", "test") //header
      .send({
        street: "jalan",
        city: "kota",
        province: "provinsi",
        country: "",
        postal_code: "",
      });

    logger.info(result.body);

    expect(result.statusCode).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if address not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put(
        "/api/contacts/" + testContact.id + "/addresses/" + (testAddress.id + 1)
      )
      .set("Authorization", "test") //header
      .send({
        street: "jalan",
        city: "kota",
        province: "provinsi",
        country: "negara",
        postal_code: "123",
      });

    logger.info(result.body);

    expect(result.statusCode).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if contact not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .put(
        "/api/contacts/" + (testContact.id + 1) + "/addresses/" + testAddress.id
      )
      .set("Authorization", "test") //header
      .send({
        street: "jalan",
        city: "kota",
        province: "provinsi",
        country: "negara",
        postal_code: "123",
      });

    logger.info(result.body);

    expect(result.statusCode).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/contacts/:contactId/addresses/:addressId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should can delete address", async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete(
        "/api/contacts/" + testContact.id + "/addresses/" + testAddress.id
      )
      .set("Authorization", "test"); //header

    logger.info(result.body);

    expect(result.statusCode).toBe(200);
    expect(result.body.data).toBe("OK");

    testAddress = await getTestAddress();
    expect(testAddress).toBeNull();
  });

  it("should return 404 if address not found", async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete(
        "/api/contacts/" + testContact.id + "/addresses/" + (testAddress.id + 1)
      )
      .set("Authorization", "test"); //header

    logger.info(result.body);

    expect(result.statusCode).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it("should return 404 if contact not found", async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();

    const result = await supertest(web)
      .delete(
        "/api/contacts/" + (testContact.id + 1) + "/addresses/" + testAddress.id
      )
      .set("Authorization", "test"); //header

    logger.info(result.body);

    expect(result.statusCode).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});
