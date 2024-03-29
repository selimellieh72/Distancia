import express from "express";
import User from "../models/user.js";
import passport from "passport";

const router = express.Router();

router.post("/register", function (req, res) {
  console.log("Heres2");
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
      profile: req.body.profile,
    },
    req.body.password,
    function (e, user) {
      console.log("here");
      if (e) {
        console.log(e);
        if (e.name === "UserExistsError") {
          console.log("here1");
          res.status(409);
          res.send();
        }
      } else {
        console.log("here2");
        passport.authenticate("local")(req, res, function () {
          console.log("here3");
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

router.patch("/users", (req, res) => {
  if (req.isAuthenticated()) {
    let query;
    if (req.body.fullName) {
      query = {
        ...req.body,
        fullName: req.body.fullName
          .split(" ")
          .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
          .join(" "),
      };
    } else {
      query = req.body;
    }

    User.findByIdAndUpdate(req.user._id, query, { new: true }, (e, user) => {
      if (e) {
        res.status(403).send();
      } else {
        res.json(user);
      }
    });
  } else {
    res.status(401).send();
  }
});

router.get(
  "/auth/google",

  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
  })
);

export default router;
