import express from "express";
import Grade from "../models/grade.js";

const router = express.Router();

router
  .route("/grades")
  .post(function (req, res) {
    if (req.isAuthenticated() && req.user.isTeacher) {
      const grade = Grade({
        title: req.body.title,
        teacher: req.user._id,
      });
      grade.save((e, grade) => {
        if (e) {
          res.status(403).send();
        } else {
          res.json(grade);
        }
      });
    } else {
      res.status(401).send();
    }
  })
  .get(function (req, res) {
    if (req.isAuthenticated()) {
      const query = req.user.isTeacher
        ? { teacher: req.user._id }
        : { students: req.user._id };

      Grade.find(query)
        .sort({ created_at: -1 })
        .populate(
          req.user.isTeacher
            ? {
                path: "students",
                select: { fullName: 1 },
                options: { sort: { created_at: -1 } },
              }
            : {
                path: "teacher",
                select: { discipline: 1 },
              }
        )
        .exec((e, grades) => {
          if (e) {
            console.log(e);
            res.status(403).send();
          } else {
            res.send(grades);
          }
        });
    }
  });

router.patch("/grade/:id", function (req, res) {
  if (req.isAuthenticated() && req.query.removeStudent) {
    Grade.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { students: req.query.removeStudent },
      },
      function (e, grade) {
        if (e) {
          res.status(403).send();
        } else {
          res.status(202).send();
        }
      }
    );
  }
});
router.post("/join-grade/:id", function (req, res) {
  if (req.isAuthenticated() && !req.user.isTeacher) {
    Grade.findByIdAndUpdate(req.params.id, {
      $push: { students: req.user.id },
    })
      .populate({
        path: "teacher",
        select: { discipline: 1, fullName: 1 },
      })
      .exec(function (e, grade) {
        if (e) {
          res.status(403).send();
        } else {
          res.status(200).json(grade);
        }
      });
  }
});

export default router;
