const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let test_thread_id, reply_test_thread_id, test_reply_id
const board = "test"

suite('Functional Tests', function () {
  this.timeout(10000)

  // Test 1: Creating a new thread: POST request to /api/threads/{board}
  test("POST new thread", function (done) {
    chai
      .request(server)
      .post("/api/threads/" + board)
      .send({
        text: "New thread test from mocha-chai",
        delete_password: "password"
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        test_thread_id = res.body.thread_id
        done();
      })
  })
  // Test 2: Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}
  test("GET 10 most recent threads", function (done) {
    chai
      .request(server)
      .get("/api/threads/" + board)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.lengthOf(res.body, 10)
        assert.equal(res.body[0]._id, test_thread_id)
        assert.equal(res.body[0].text, "New thread test from mocha-chai")
        done()
      })
  })
  // Test 3: Reporting a thread: PUT request to /api/threads/{board}
  test("PUT report thread", function (done) {
    chai
      .request(server)
      .put("/api/threads/" + board)
      .send({ thread_id: test_thread_id })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "text/html");
        assert.equal(res.text, "success")
        done();
      })
  })
  // Test 4: Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password
  test("DELETE thread - incorrect password", function (done) {
    chai
      .request(server)
      .delete("/api/threads/" + board)
      .send({
        thread_id: test_thread_id,
        delete_password: "incorrect_password"
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "text/html");
        assert.equal(res.text, "incorrect password")
        done();
      })
  })
  // Test 5: Deleting a thread with the correct password: DELETE request to /api/threads/{board} with a valid delete_password
  test("DELETE thread - success", function (done) {
    chai
      .request(server)
      .delete("/api/threads/" + board)
      .send({
        thread_id: test_thread_id,
        delete_password: "password"
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "text/html");
        assert.equal(res.text, "success")
        done();
      })
  })
  // POST a new thread_id from for replies' testing
  test("POST a new thread to retrieve a thread_id", function (done) {
    chai
      .request(server)
      .post("/api/threads/" + board)
      .send({
        text: "New thread test from mocha-chai for reply testing",
        delete_password: "password"
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        reply_test_thread_id = res.body.thread_id
        done()
      })
  })
  // Test 6: Creating a new reply: POST request to /api/replies/{board}
  test("POST new reply", function (done) {
    chai
      .request(server)
      .post("/api/replies/" + board)
      .send({
        thread_id: reply_test_thread_id,
        text: "New reply test from mocha-chai",
        delete_password: "password"
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.isArray(res.body.replies)
        assert.equal(res.body.replies[0].text, "New reply test from mocha-chai")
        test_reply_id = res.body.replies[0]._id
        done();
      })
  })
  // Test 7: Viewing a single thread with all replies: GET request to /api/replies/{board}
  test("GET all replies for a thread", function (done) {
    chai
      .request(server)
      .get("/api/replies/" + board + "?thread_id=" + reply_test_thread_id)
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.isArray(res.body.replies)
        assert.equal(res.body.replies[0].text, "New reply test from mocha-chai")
        done();
      })
  })
  // Test 8: Reporting a reply: PUT request to /api/replies/{board}
  test("PUT report reply", function (done) {
    chai
      .request(server)
      .put("/api/replies/" + board)
      .send({ reply_id: test_reply_id })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "text/html");
        assert.equal(res.text, "success")
        done();
      })
  })
  // Test 9: Deleting a reply with the incorrect password: DELETE request to /api/replies/{board} with an invalid delete_password
  test("DELETE reply - incorrect password", function (done) {
    chai
      .request(server)
      .delete("/api/replies/" + board)
      .send({
        reply_id: test_reply_id,
        delete_password: "incorrect_password"
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "text/html");
        assert.equal(res.text, "incorrect password")
        done();
      })
  })
  // Test 10: Deleting a reply with the correct password: DELETE request to /api/replies/{board} with a valid delete_password
  test("DELETE reply - success", function (done) {
    chai
      .request(server)
      .delete("/api/replies/" + board)
      .send({
        reply_id: test_reply_id,
        delete_password: "password"
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, "text/html");
        assert.equal(res.text, "success")
        done();
      })
  })

});
