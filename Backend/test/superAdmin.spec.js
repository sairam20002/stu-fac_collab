const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
let { superAdminTestToken } = require("../config/config");
//Assertion style
chai.should();
chai.use(chaiHttp);
describe("Institute API", () => {
  /*
        Test View All Instritute route here
    */

  describe("GET /api/institute", () => {
    it("Accessing user must be super admin and must return all institutes", (done) => {
      chai
        .request(server)
        .get("/api/institute")
        .set({ "x-auth-token": superAdminTestToken })
        .end((err, response) => {
          response.should.have.status(200);
          //console.log(response.body)
          response.body.should.have.property("message");
          response.body.should.have.property("institute");
          done();
        });
    });
  });

  /*
        Test View All Admins route here
    */
  describe("GET /api/institute/admin", () => {
    it("Accessing user must be super admin and return list of admins", (done) => {
      chai
        .request(server)
        .get("/api/institute/admin")
        .set({ "x-auth-token": superAdminTestToken })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("message");
          response.body.should.have.property("admins");
          done();
        });
    });
  });
  
  describe("GET /api/institute/:d", () => {
    it("Accessing user must be super admin and must Get institutes by ID", (done) => {
      chai
        .request(server)
        .get("/api/institute")
        .set({ "x-auth-token": superAdminTestToken })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("message");
          response.body.should.have.property("institute");
          done();
        });
    });
  });


  describe("GET /api/institute", () => {
    it("Accessing user must be super admin", (done) => {
      chai
        .request(server)
        .get("/api/institute")
        .set({ "x-auth-token": superAdminTestToken })
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });


});
