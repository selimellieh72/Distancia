import express from "express";
import mongoose from "mongoose";
import Message from "../models/message.js";

const router = express.Router();

router.post("/messages", function (req, res) {
  if (req.isAuthenticated()) {
    const message = new Message({ ...req.body, sender: req.user._id });
    message.save(function (e, message) {
      if (e) {
        console.log(e);
        res.status(403).send();
      }
      res.json(message);
    });
  } else {
    res.status(401).send();
  }
});

router.get("/messages", function (req, res) {
  if (req.isAuthenticated()) {
    if (req.query.user) {
      const userId = mongoose.Types.ObjectId(req.user._id);
      const secondUserId = mongoose.Types.ObjectId(req.query.user);
      Message.find({
        $and: [
          { $or: [{ sender: userId }, { sender: secondUserId }] },
          { $or: [{ reciever: userId }, { reciever: secondUserId }] },
        ],
      })
        .sort({ created_at: 1 })
        .exec(function (e, messages) {
          if (e) {
            res.status(403).send();
          } else {
            res.json(
              messages.map((message) => ({
                ...message._doc,
                isMe: req.user._id.equals(message._doc.sender),
              }))
            );
          }
        });
    } else {
      res.status(403).send();
    }
  } else {
    res.status(401).send();
  }
});

export default router;
