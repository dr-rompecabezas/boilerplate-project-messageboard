'use strict';
const { create } = require('../models/message.model.js');
const MessageModel = require('../models/message.model.js')

module.exports = function (app) {

  app.route('/api/threads/:board')

    // POST new thread
    .post(function (req, res) {
      MessageModel.create({
        board: req.params.board,
        text: req.body.text,
        delete_password: req.body.delete_password
      }, function (err, doc) {
        res.send({thread_id: doc._id});
      })
    })

    // GET 10 most recent bumped threads on the board with only the most recent 3 replies for each.
    // .slice('replies', 3)
    .get(async function (req, res) {
      await MessageModel.find({ board: req.params.board }).sort({ bumped_on: -1 }).limit(10).exec(function (err, docs) {
        res.send(docs)
      })
    })

    // PUT report thread
    .put(async function (req, res) {
      await MessageModel.findByIdAndUpdate(req.body.thread_id, { reported: true }, function (err, doc) {
        res.send("success")
      })
    })

    // DELETE thread
    .delete(async function (req, res) {
      await MessageModel.findById(req.body.thread_id, { delete_password: true }, function (err, doc) {
        if (doc.delete_password != req.body.delete_password) {
          res.send("incorrect password")
        } else {
          doc.remove(function (err, doc) {
            res.send("success")
          })
        }
      })
    })

  app.route('/api/replies/:board')

    // POST reply
    .post(async function (req, res) {
      await MessageModel.findById(req.body.thread_id, function (err, doc) {
        doc.replies.push({
          text: req.body.text,
          delete_password: req.body.delete_password
        })
        doc.bumped_on = Date.now()
        doc.save().then(res.send(doc))
      })
    })

    // GET reply
    .get(async function (req, res) {
      await MessageModel.findById(req.query.thread_id, function (err, doc) {
        res.send(doc)
      })
    })

    // PUT reply
    .put(async function (req, res) {
      await MessageModel.findOneAndUpdate(
        { "replies._id": req.body.reply_id },
        { $set: { "replies.$.reported": true } },
        { new: true }, function (err, doc) {
          res.send("success")
        })
    })

    // DELETE reply
    .delete(async function (req, res) {
      await MessageModel.findOne({ "replies._id": req.body.reply_id },
        { "replies._id": true, "replies.delete_password": true, "replies.text": true },
        { new: true }, function (err, doc) {
          if (doc.replies.id(req.body.reply_id).delete_password != req.body.delete_password) {
            res.send("incorrect password")
          } else {
            doc.replies.id(req.body.reply_id).text = "[deleted]"
            doc.save().then(res.send("success"))
          }
        })
    })
};
