const { expect } = require("chai");
const {
  db,
  models: { User },
} = require("../server/db");
const jwt = require("jsonwebtoken");
const app = require("supertest")(require("../server/app"));

describe("User Model", () => {
  let users;
  beforeEach(async () => {
    await db.sync({ force: true });
    const [lucy, larry] = await Promise.all([
      User.create({ username: "lucy", password: "lucy_pw" }),
      User.create({ username: "larry", password: "larry_pw" }),
    ]);
    users = { lucy, larry };
  });
  describe("seeded data", () => {
    it("there are 2 users", () => {
      expect(Object.keys(users).length).to.equal(2);
    });
  });
  describe("User.authenticate", () => {
    describe("correct credentials", () => {
      it("returns a token", async () => {
        const token = await User.authenticate("lucy", "lucy_pw");
        expect(token).to.be.ok;
      });
    });
    describe("incorrect credentials", () => {
      it("throws an erro", async () => {
        try {
          await User.authenticate("lucy", "lucy" );
        } catch (ex) {
          expect(ex.status).to.equal(401);
          expect(ex.message).to.equal("bad credentials");
        }
      });
    });
  });
  describe("User.byToken", () => {
    describe("with a valid token", () => {
      it("returns a user", async () => {
        const token = await jwt.sign({ id: users.larry.id }, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.byToken(token);
        console.log('test user', user)
        expect(user.username).to.equal("larry");
      });
    });
    describe("with an invalid token", () => {
      it("throws an errro", async () => {
        try {
          const token = await jwt.sign({ id: users.larry.id }, "bad secret");
          await User.byToken(token);
          throw "error";
        } catch (ex) {
          expect(ex.status).to.equal.toString(401);
          expect(ex.message).to.equal("bad credentials");
        }
      });
    });
    describe("with a valid token but no associated users", () => {
      it("throws an errro", async () => {
        try {
          const token = await jwt.sign({ id: 1 }, process.env.JWT);
          await User.byToken(token);
          throw "error";
        } catch (ex) {
          expect(ex.status).to.equal.toString(401);
          expect(ex.message).to.equal("bad credentials");
        }
      });
    });
  });
  describe("Routes", () => {
    describe("POST /api/auth", () => {
      describe("with valid credentials", () => {
        it("returns a token", async () => {
          const response = await app
            .post("/api/auth")
            .send({email: "larry", password:"larry_pw"});
          expect(response.status).to.equal(200);
          expect(response.body.token).to.be.ok;
        });
      });
      describe("with an invalid credentials", () => {
        it("throws an error", async () => {
          const response = await app
            .post("/api/auth")
            .send({ email: "larry", password: "larry" });
          expect(response.status).to.equal(401);
          expect(response.body.error).to.equal("bad credentials");
        });
      });
    });
    describe("GET /api/auth", () => {
      describe("with valid token", () => {
        it("returns an user", async () => {
          const token = await jwt.sign({ id: users.lucy.id }, process.env.ACCESS_TOKEN_SECRET);
          const response = await app
            .get("/api/auth")
            .set({ authorization: token });
          expect(response.status).to.equal(200);
          expect(response.body.user.username).to.equal("lucy");
        });
      });
      describe("with an invalid token", () => {
        it("returns an user", async () => {
          const token = await jwt.sign({ id: users.lucy.id }, "not a secret");
          const response = await app
            .get("/api/auth")
            .set({ authorization: token });
          expect(response.status).to.equal(401);
          expect(response.body.error).to.equal("bad credentials");
        });
      });
    });
  });
});
