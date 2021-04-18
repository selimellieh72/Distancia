import express from "express";
import crypto from "crypto";
import path from "path";
import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";

export default function (app) {
  const router = express.Router();

  const storage = new GridFsStorage({
    url: app.get("MongoURI"),
    file: (req, file) => {
      return {
        bucketName: "uploads",
        filename: file.originalname,
      };
    },
  });
  const upload = multer({ storage });

  router.post("/upload", upload.array("files", 5), (req, res) => {
    res.json({ files: req.files });
  });

  router.get("/uploads/:id", function (req, res) {
    const gfs = app.get("gfs");
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
  return router;
}
