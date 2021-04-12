import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import crypto from "crypto";
import path from "path";
import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import Grid from "gridfs-stream";

import User from "./models/user.js";
import Homework from "./models/homework.js";
import Grade from "./models/grade.js";

eval(
  `Grid.prototype.findOne = ${Grid.prototype.findOne
    .toString()
    .replace("nextObject", "next")}`
);

const app = express();
const port = process.env.PORT || 5000;

//Middlewares

app.use(express.json());

app.use(
  session({
    secret: "SelimTheoLau",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(passport.initialize());
app.use(passport.session());

//DB

const MongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/distanciaDB";
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const conn = mongoose.connection;
let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

const storage = new GridFsStorage({
  url: MongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

mongoose.set("useCreateIndex", true);

//Auth

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Routes

app.post("/register", function (req, res) {
  const fullNameFormated = req.body.fullName
    .split(" ")
    .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
    .join(" ");
  User.register(
    {
      fullName: fullNameFormated,
      username: req.body.username,
      isTeacher: req.body.isTeacher,
      discipline: req.body.discipline,
    },
    req.body.password,
    function (e, user) {
      if (e) {
        if (e.name === "UserExistsError") {
          res.status(409);
          res.send();
        }
      } else {
        passport.authenticate("local")(req, res, function () {
          res.status(200);
          // res.json({ message: "Successfully registered" });
          res.json(user);
        });
      }
    }
  );
});

app.post("/login", function (req, res, next) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "authentication failed",
      });
    }
    req.login(user, function (err) {
      if (err) {
        return next(err);
      }

      return res.json(user);
    });
  })(req, res, next);
});

app.get("/session", function (req, res) {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.status(401);
    res.json({ message: "User not authenticated" });

    res.send();
  }
});

app.post("/logout", function (req, res) {
  req.logout();
  res.send();
});

app
  .route("/homeworks")
  .get(function (req, res) {
    if (req.isAuthenticated()) {
      async function getHomeworksQuery() {
        let query;
        if (req.query.grade) {
          query = { grade: req.query.grade };
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
            .populate(
              req.user.isTeacher
                ? { path: "answers.student", select: { fullName: 1 } }
                : ""
            )
            .sort({ created_at: -1 })
            .exec(function (e, homeworks) {
              if (e) {
                res.status(403).send();
              } else {
                const response = {
                  homeworks: req.user.isTeacher
                    ? homeworks
                    : homeworks.map((homework) => {
                        const accomplishedUsersIds =
                          homework._doc.accomplishedUsersIds;
                        const homeworkWithoutAccomplishedUsersIds =
                          homework._doc;
                        delete homeworkWithoutAccomplishedUsersIds.accomplishedUsersIds;
                        return {
                          ...homeworkWithoutAccomplishedUsersIds,
                          isAccomplished: accomplishedUsersIds.includes(
                            req.user.id
                          ),
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

app
  .route("/homeworks/:id")
  .patch(function (req, res) {
    if (req.isAuthenticated()) {
      if (
        !req.user.isTeacher &&
        (parseInt(req.query.accomplish) ||
          (parseInt(req.query.answer) && req.body.fileId))
      ) {
        const update = {
          $push: parseInt(req.query.accomplish)
            ? { accomplishedUsersIds: req.user.id }
            : {
                accomplishedUsersIds: req.user.id,
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

app
  .route("/grades")
  .post(function (req, res) {
    if (req.isAuthenticated && req.user.isTeacher) {
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
    if (req.isAuthenticated) {
      const query = req.user.isTeacher
        ? { teacher: req.user._id }
        : { students: req.user._id };

      Grade.find(query)
        .sort({ created_at: -1 })
        .populate({
          path: "students",
          select: { fullName: 1 },
          options: { sort: { created_at: -1 } },
        })
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

app.patch("/grade/:id", function (req, res) {
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
  }
});
app.post("/join-grade/:id", function (req, res) {
  if (req.isAuthenticated() && !req.user.isTeacher) {
    Grade.findByIdAndUpdate(
      req.params.id,
      {
        $push: { students: req.user.id },
      },
      function (e, grade) {
        if (e) {
          res.status(403).send();
        } else {
          res.status(200).json(grade);
        }
      }
    );
  }
});

app.post("/upload", upload.array("files", 5), (req, res) => {
  res.json({ files: req.files });
});

app.get("/uploads/:id", function (req, res) {
  gfs.findOne({ _id: req.params.id }, function (err, file) {
    if (err) {
      return res.status(400).send(err);
    } else if (!file) {
      return res
        .status(404)
        .send("Error on the database looking for the file.");
    }

    res.set("Content-Type", file.contentType);
    res.set(
      "Content-Disposition",
      'attachment; filename="' + file.filename + '"'
    );

    var readstream = gfs.createReadStream({
      _id: req.params.id,
    });

    readstream.on("error", function (err) {
      res.end();
    });
    readstream.pipe(res);
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(port, () => console.log("Server started on port " + port));
