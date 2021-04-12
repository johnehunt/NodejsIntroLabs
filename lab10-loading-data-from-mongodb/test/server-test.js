const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

// Import server to be tested
const server = require("../server");

const PATH = "/api/books";

describe("Testing book REST API", function () {
  it("should list ALL books on /api/books GET", function (done) {
    chai
      .request(server)
      .get(PATH)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        done();
      });
  });
  it("should list a SINGLE book on /books/<isbn> GET", function (done) {
    chai
      .request(server)
      .get(PATH + "/321")
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        done();
      });
  });
  it("should add a SINGLE book on /books POST", function (done) {
    chai
      .request(server)
      .post(PATH)
      .send({ isbn: "333", author: "Phoebe Davies", title: "TypeScript World", price: 11.95 })
      .end(function (err, res) {
        res.should.have.status(200);
        res.text.should.equal("Book added");
        done();
      });
  });
  it("should update a SINGLE book on /books PUT", function (done) {
    chai
      .request(server)
      .put(PATH)
      .send({ id: "321", author: "Phoebe Davies", title: "TypeScript World", price: 11.95 })
      .end(function (err, res) {
        res.should.have.status(200);
        res.text.should.equal("Book updated");
        done();
      });
  });
  it("should delete a SINGLE book on /books/<id> DELETE", function (done) {
    chai
      .request(server)
      .delete(PATH + "/1")
      .end(function (err, res) {
        res.should.have.status(200);
        res.text.should.be.equal("Book deleted");
        done();
      });
  });
});
