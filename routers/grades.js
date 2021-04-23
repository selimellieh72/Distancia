import express from "express";

import Grade from "../models/grade.js";
import Chapter from "../models/chapter.js";
import Lecture from "../models/lecture.js";
import Request from "../models/request.js";
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
        .select(req.user.isTeacher ? "-teacher" : "-students")
        .select("-lectures")
        .populate(
          !req.user.isTeacher
            ? {
                path: "teacher",
                select: { discipline: 1 },
              }
            : ""
        )
        .exec((e, grades) => {
          if (e) {
            res.status(403).send();
          } else {
            res.send(grades);
          }
        });
    }
  });

router
  .route("/grades/:id")
  .get(function (req, res) {
    if (req.isAuthenticated()) {
      Grade.findById(req.params.id)
        .select(req.query.teacher ? "teacher" : "")
        .select(req.query.students ? "students" : "")
        .select(req.query.title ? "title" : "")
        .populate(
          req.user.isTeacher
            ? {
                path: "students",
                select: "fullName profile",
                options: { sort: { created_at: -1 } },
              }
            : {
                path: "teacher",
                select: "fullName profile",
              }
        )
        .exec(function (e, grade) {
          if (e) {
            res.status(403).send();
          } else {
            res.json(grade);
          }
        });
    } else {
      res.status(401).send;
    }
  })
  .patch(function (req, res) {
    if (req.isAuthenticated()) {
      if (req.query.removeStudent) {
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
      } else if (req.query.addChapter) {
        const title = req.body.title;
        if (title && title.length >= 10 && title.length <= 50) {
          const chapter = new Chapter({ title });

          Grade.findByIdAndUpdate(
            req.params.id,
            {
              $push: { chapters: chapter },
            },
            function (e, grade) {
              if (e) {
                res.status(403).send();
              } else {
                res.status(202).json({ chapter_id: chapter._id });
              }
            }
          );
        } else {
          res.status(403).send();
        }
      } else if (req.query.deleteChapter) {
        Grade.findByIdAndUpdate(
          req.params.id,
          {
            $pull: { chapters: { _id: req.body.chapterId } },
          },
          function (e) {
            if (e) {
              res.status(403).send();
            } else {
              res.send();
            }
          }
        );
      } else if (req.query.addLecture) {
        const lecture = new Lecture(req.body);

        Grade.findByIdAndUpdate(
          req.params.id,
          {
            $push: { lectures: lecture },
          },
          function (e, grade) {
            if (e) {
              res.status(403).send();
            } else {
              lecture
                .populate({ path: "file", select: { filename: 1 } })
                .execPopulate(function (e, lecture) {
                  if (e) {
                    res.status(403).send();
                  } else {
                    res.json(lecture);
                  }
                });
            }
          }
        );
      } else if (req.query.deleteLecture) {
        Grade.findByIdAndUpdate(
          req.params.id,
          {
            $pull: { lectures: { _id: req.body.lectureId } },
          },
          function (e) {
            if (e) {
              res.status(403).send();
            } else {
              res.send();
            }
          }
        );
      }
    } else {
      res.status(401).send();
    }
  })
  .delete(function (req, res) {
    Grade.findByIdAndRemove(req.params.id, function (e) {
      if (!e) {
        res.status(200).send();
      }
    });
  });
router.post("/join-grade/:id", function (req, res) {
  if (req.isAuthenticated() && !req.user.isTeacher) {
    Grade.findById(req.params.id)
      .populate({
        path: "teacher",
        select: { discipline: 1, fullName: 1 },
      })
      .exec(function (e, grade) {
        if (!grade) {
          res.status(403).json({
            message: `Incorrect id, please try again.`,
          });
        } else if (grade.students.includes(req.user.id)) {
          res.status(403).json({
            message: `Cannot join grade '${grade.title}' that you've already joined`,
          });
        } else {
          const myRequest = {
            student: req.user._id,
            grade: grade._id,
          };
          Request.findOne(myRequest, function (e, gottenRequest) {
            if (e || gottenRequest) {
              res.status(403).json({
                message: `A request has already been sent to join grade '${grade.title}' of teacher '${grade.teacher.fullName}'.`,
              });
            } else {
              const request = new Request(myRequest);
              request.save(function (e) {
                if (e) {
                  res.status(403).send;
                } else {
                  res.send(grade);
                }
              });
            }
          });
        }
      });
  }
});

router.get("/grades/:id/lectures", function (req, res) {
  if (req.isAuthenticated()) {
    Grade.aggregate;
    Grade.findById(req.params.id)
      .select("lectures")
      .select(req.query.chapter ? " chapters" : "")

      .populate("lectures.file")
      .exec(function (e, grade) {
        if (e) {
          res.status(403).send();
        } else {
          const response = {};
          const lectures = !req.query.chapter
            ? grade.lectures
            : grade.lectures.filter((lecture) =>
                lecture.chapter.equals(req.query.chapter)
              );

          response.lectures = lectures;
          if (req.query.chapter)
            response.chapterTitle = grade.chapters.filter((chapter) =>
              chapter._id.equals(req.query.chapter)
            )[0].title;

          res.json(response);
        }
      });
  } else {
    res.status(401).send();
  }
});

export default router;
