'use strict';
const MessageModel = require('../models/message.model.js')

module.exports = function (app) {

  app.route('/api/threads/:board')

    // POST thread
    // You can send a POST request to /api/threads/{board} 
    // with form data including text and delete_password.
    .post(function (req, res) {
      const board = req.params.board
      const { text, delete_password } = req.body
      console.log(board, text, delete_password)
      res.send("OK")
    })

    // GET thread
    .get(function (req, res) {
      res.send("OK")
    })

    // PUT thread
    .put(function (req, res) {
      res.send("OK")
    })

    // DELETE thread
    .delete(function (req, res) {
      res.send("OK")
    })

  app.route('/api/replies/:board')

    // POST reply
    .post(function (req, res) {
      res.send("OK")
    })

    // GET reply
    .get(function (req, res) {
      res.send("OK")
    })

    // PUT reply
    .put(function (req, res) {
      res.send("OK")
    })

    // DELETE reply
    .delete(function (req, res) {
      res.send("OK")
    })
};
