import express from "express";
import Homework from "../models/homework.js";
import Grade from "../models/grade.js";

const router = express.Router();

router
  .route("/homeworks")
  .get(function (req, res) {
    if (req.isAuthenticated()) {
      async function getHomeworksQuery() {
        let query;
        if (Object.keys(req.query).length > 0) {
          query = req.query;
        } else {
          const grades = await Grade.find(
            req.user.isTeacher
              ? { teacher: req.user.id }
              : { students: req.user.id }
          );
          const userGradesId = grades.map((grade) => grade._id);

          query = { grade: { $in: userGradesId } };
        }
        return query;
      }

      getHomeworksQuery()
        .then((query) => {
          Homework.find(query)
            .populate({
              path: "grade",
              select: { _id: 1, teacher: 1, title: 1 },
              populate: {
                path: "teacher",
                select: { fullName: 1, discipline: 1 },
              },
            })

            .select("-answers")
            .populate({ path: "files", select: { filename: 1 } })
            .sort({ created_at: -1 })
            .exec(function (e, homeworks) {
              if (e) {
                console.log(e);
                res.status(403).send();
              } else {
                const response = {
                  homeworks: req.user.isTeacher
                    ? homeworks
                    : homeworks.map((homework) => {
                        const accomplishedUsers =
                          homework._doc.accomplishedUsers;
                        const dueDate = homework._doc.dueDate;
                        const newHomeworks = homework._doc;
                        const isAccomplished = accomplishedUsers.includes(
                          req.user.id
                        );
                        delete newHomeworks.accomplishedUsers;
                        return {
                          ...newHomeworks,
                          isAccomplished: isAccomplished,
                          isExpired: !isAccomplished && dueDate < new Date(),
                        };
                      }),
                };
                if (req.query.grade) {
                  Grade.findById(req.query.grade)
                    .select("title")
                    .exec(function (e, grade) {
                      if (e) {
                        res.status(403).send();
                      }
                      response.gradeTitle = grade?.title;
                      res.json(response);
                    });
                } else {
                  res.json(response);
                }
              }
            });
        })
        .catch((e) => {
          return res.status(402).send();
        });
    }
  })
  .post(function (req, res) {
    if (req.isAuthenticated()) {
      const homework = new Homework({
        ...req.body,
        teacher: req.user._id,
        teacherName: req.user.fullName,
        teacherDiscipline: req.user.discipline,
      });

      homework.save(function (e, homework) {
        homework
          .populate({
            path: "grade",
            select: { _id: 1, teacher: 1, title: 1 },
            populate: {
              path: "teacher",
              select: { fullName: 1, discipline: 1 },
            },
          })
          .populate({ path: "files", select: { filename: 1 } })
          .execPopulate((e, homework) => {
            if (e) {
              res.status(403).send();
            } else {
              res.json(homework);
            }
          });
      });
    } else {
      res.status(401).send();
    }
  });

router
  .route("/homeworks/:id")
  .get(function (req, res) {
    if (req.isAuthenticated()) {
      Homework.findById(req.params.id)

        .populate({
          path: "grade",
          select: { students: 1 },
          populate: {
            path: "students",
            select: { fullName: 1 },
          },
        })
        .exec(function (e, homework) {
          if (e) {
            res.status(403).send();
          } else {
            res.json(homework);
          }
        });
    } else {
      res.status(401).send();
    }
  })
  .patch(function (req, res) {
    if (req.isAuthenticated()) {
      if (
        !req.user.isTeacher &&
        (parseInt(req.query.accomplish) ||
          (parseInt(req.query.answer) && req.body.fileId))
      ) {
        const update = {
          $push: parseInt(req.query.accomplish)
            ? { accomplishedUsers: req.user.id }
            : {
                accomplishedUsers: req.user.id,
                answers: { student: req.user.id, fileId: req.body.fileId },
              },
        };

        Homework.findByIdAndUpdate(
          req.params.id,
          update,
          function (e, homework) {
            if (e) {
              res.status(403).send();
            } else {
              res.status(200).send();
            }
          }
        );
      } else if (req.user.isTeacher) {
        Homework.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true },
          function (e, homework) {
            if (e) {
              res.status(403).send();
            } else {
              res.status(200).json(homework);
            }
          }
        );
      }
    } else {
      res.status(401).send();
    }
  })
  .delete(function (req, res) {
    const homeworkId = req.params.id;
    Homework.findByIdAndDelete(homeworkId, function (e, homework) {
      if (!e) {
        res.status(200).send();
      }
    });
  });

export default router;
