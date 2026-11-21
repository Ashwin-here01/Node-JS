const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");

const app = express();
const PORT = 9000;

mongoose
  .connect("mongodb://127.0.0.1:27017/notes-app")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error", err));

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  if (req.path === "/favicon.ico") return res.end();
  const log = `${Date.now()} - ${req.method} ${req.path} ${req.ip}\n`;
  fs.appendFile("./log.txt", log, (err, data) => {
    if (err) return console.log("Error making log", err);
    next();
  });
});

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Note = mongoose.model("note", noteSchema);

app.get("/notes", async (req, res) => {
  if ((await Note.findOne({})) === null) {
    return res.status(404).json({ msg: "no entries" });
  }

  const allNotes = await Note.find({});

  const html = `
  <dl>
    ${allNotes.map((note) => `<dt>${note.title}</dt> <dd>${note.description}</dd>`).join("")}
  </dl>
  `;

  res.send(html);
});

app
  .route("/api/notes")

  .get(async (req, res) => {
    const allNotes = await Note.find({});
    return res.json(allNotes);
  })

  .post(async (req, res) => {
    const body = req.body;
    if (!body || !body.title || !body.description) {
      return res.status(400).json({ msg: "all fields are required" });
    }

    const result = await Note.create({
      title: body.title,
      description: body.description,
    });

    return res.status(201).json({ msg: "Success", id: result._id });
  });

app
  .route("/api/notes/:id")

  .get(async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: "note not found" });
    return res.status(200).json(note);
  })

  .patch(async (req, res) => {
    const body = req.body;
    if (body.title)
      await Note.findByIdAndUpdate(req.params.id, { title: body.title });
    if (body.description)
      await Note.findByIdAndUpdate(req.params.id, {
        description: body.description,
      });
    return res.status(200).json({ msg: "Success" });
  })

  .delete(async (req, res) => {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ msg: "Note not found" });
    return res.status(200).json({ title: deletedNote.title, msg: "Success" });
  });

app.listen(PORT, () => console.log(`Server started at ${PORT} port`));
