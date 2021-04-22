import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
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
import requestsRouter from "./routers/requests.js";

//Sockets
import sockets from "./sockets.js";

// Constants
eval(
  `Grid.prototype.findOne = ${Grid.prototype.findOne
    .toString()
    .replace("nextObject", "next")}`
);

const app = express();
const server = http.createServer(app);

const MongoURI =
  process.env.MONGODB_URI ||
  "mongodb+srv://selimellieh:Selim2015@distanciadb.jsla5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const port = process.env.PORT || 5000;

const sessionMiddleware = session({
  secret: "SelimTheoLau",
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: MongoURI }),
});
//Middlewares

app.use(express.json());

app.use(sessionMiddleware);
app.use(cors({ credentials: true, origin: true }));
app.use(passport.initialize());
app.use(passport.session());

//Socket IO

sockets(server, sessionMiddleware);

//DB

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
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//Routers
app.use("/api", userRouter);
app.use("/api", homeworksRouter);
app.use("/api", gradesRouter);
app.use("/api", requestsRouter);

app.use("/api", uploadRouter(app));

//Heroku set up
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static("client/build"));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

server.listen(port, () => console.log("Server started on port " + port));
