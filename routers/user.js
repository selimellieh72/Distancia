import express from "express";
import User from "../models/user.js";
import passport from "passport";

const router = express.Router();

router.post("/register", function (req, res) {
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

router.post("/login", function (req, res, next) {
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

router.get("/session", function (req, res) {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.status(401);
    res.json({ message: "User not authenticated" });

    res.send();
  }
});

router.post("/logout", function (req, res) {
  req.logout();
  res.send();
});

export default router;
