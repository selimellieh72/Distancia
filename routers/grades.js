import express from "express";
import Grade from "../models/grade.js";
import Chapter from "../models/Chapter.js";
import Lecture from "../models/lecture.js";
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

router
  .route("/grades/:id")
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
      } else if (req.query.addChapter === "true") {
        const title = req.body.title;
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
      } else if (req.query.addLecture === "true") {
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
      } else {
        res.status(403).send();
      }
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
        if (e) {
          res.status(403).send({
            message: `Incorrect id, please try again.`,
          });
        } else if (grade.students.includes(req.user.id)) {
          res.status(403).send({
            message: `Cannot join grade '${grade.title}' that you've already joined`,
          });
        } else {
          grade.students.push(req.user.id);
          grade.save(function (e, grade) {
            if (e) {
              res.status(403).send();
            } else {
              res.status(200).json(grade);
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
