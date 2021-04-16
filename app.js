import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";

import path from "path";

import Grid from "gridfs-stream";

//Models
import User from "./models/user.js";

//Routers
import userRouter from "./routers/user.js";
import homeworksRouter from "./routers/homeworks.js";
import gradesRouter from "./routers/grades.js";
import uploadRouter from "./routers/upload.js";

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
app.use(cors({ credentials: true, origin: true }));
app.use(passport.initialize());
app.use(passport.session());

//DB

const MongoURI =
  process.env.MONGODB_URI ||
  "mongodb+srv://selimellieh:Selim2015@distanciadb.jsla5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
app.set("MongoURI", MongoURI);
const conn = mongoose.connection;
let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
  app.set("gfs", gfs);
});

mongoose.set("useCreateIndex", true);

//Auth

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Routers
app.use("/api", userRouter);
app.use("/api", homeworksRouter);
app.use("/api", gradesRouter);
app.use("/api", uploadRouter(app));

//Heroku set up
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static("client/build"));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log("Server started on port " + port));
