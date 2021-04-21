import express from "express";

import Grade from "../models/grade.js";
import Request from "../models/request.js";
const router = express.Router();

router.get("/requests", function (req, res) {
  if (req.isAuthenticated() && req.user.isTeacher) {
    Grade.find({ teacher: req.user._id }).distinct(
      "_id",
      function (e, teacherGradeIds) {
        if (e) {
          res.status(403).send();
        } else {
          Request.find({
            grade:
              req.query.grade &&
              teacherGradeIds.filter((id) => id.equals(req.query.grade))
                .length >= 1
                ? req.query.grade
                : teacherGradeIds,
          })
            .populate({
              path: "student",
              select: { fullName: 1 },
            })
            .sort({ created_at: -1 })
            .exec(function (e, requests) {
              if (e) {
                res.status(403).send();
              } else {
                res.json(requests);
              }
            });
        }
      }
    );
  } else {
    res.status(401).send();
  }
});

router.delete("/requests/:id", function (req, res) {
  if (req.isAuthenticated() && req.user.isTeacher) {
    Request.findByIdAndDelete(req.params.id, function (e, request) {
      if (e) {
        res.status(403).send();
      } else {
        if (req.query.status === "ACCEPTED") {
          Grade.findByIdAndUpdate(
            request.grade,
            {
              $push: { students: request.student },
            },
            function (e) {
              if (e) {
                res.status(403).send();
              } else {
                request
                  .populate({ path: "student", select: { fullName: 1 } })
                  .execPopulate(function (e, request) {
                    if (e) {
                      res.status(403).send();
                    } else {
                      res.json(request);
                    }
                  });
              }
            }
          );
        } else {
          res.send(request);
        }
      }
    });
  } else {
    res.status(401).send();
  }
});

export default router;
