const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

// Import server to be tested
const server = require("../server");

// Set up the common path to all of the RESTful services
const PATH = "/api/books";

describe("Testing book REST API", function() {
  it("should list ALL books on /api/books GET", function(done) {
    chai
      .request(server)
      .get(PATH)
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("array");
        res.body.should.have.length(3);
        done();
      });
  });
  it("should list a SINGLE book on /books/<isbn> GET", function(done) {
    chai
      .request(server)
      .get(PATH + "/0")
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property('isbn', '0');
        done();
      });
  });
  it("should add a SINGLE book on /books POST", function(done) {
    chai
      .request(server)
      .post(PATH)
      .send({ isbn: "3", author: "Gryff Davies", title: "Kotlin World", price: 11.95  })
      .end(function(err, res) {
        res.should.have.status(201);
        res.text.should.equal("Book added");
        done();
      });
  });
  it("should update a SINGLE book on /books PUT", function(done) {
    chai
      .request(server)
      .put(PATH)
      .send({ isbn: '2', author: "Phoebe Davies", title: "TypeScript World", price: 11.95  })
      .end(function(err, res) {
        res.should.have.status(201);
        res.text.should.equal("Book updated");
        done();
      });
  });
  it("should delete a SINGLE book on /books/<id> DELETE", function(done) {
    chai
      .request(server)
      .delete(PATH + "/1")
      .end(function(err, res) {
        res.should.have.status(204);
        done();
      });
  });
});
