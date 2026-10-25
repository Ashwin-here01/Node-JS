const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

// Connecting MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error", err));

//Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("user", userSchema);

// Middleware - Plugin
app.use(express.urlencoded({ extended: false })); // It looks into the content-type in req headers and only runs when option matches

// Routes
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
  <ul>
      ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
  </ul>
  `;
  return res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
});

app
  .route("/api/users/:id")

  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found!" });
    return res.json(user);
  })

  .patch(async (req, res) => {
    const body = req.body;
    for (let key in body) {
      switch (key) {
        case "first_name":
          await User.findByIdAndUpdate(req.params.id, { firstName: body[key] });
          break;
        case "last_name":
          await User.findByIdAndUpdate(req.params.id, { lastName: body[key] });
          break;
        case "email":
          await User.findByIdAndUpdate(req.params.id, { email: body[key] });
          break;
        case "job_title":
          await User.findByIdAndUpdate(req.params.id, { jobTitle: body[key] });
          break;
        case "gender":
          await User.findByIdAndUpdate(req.params.id, { gender: body[key] });
          break;
        default:
          return res.status(400).json({ msg: "Wrong field" });
      }
    }
    return res.status(200).json({ msg: "Success" });
  })

  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "Success" });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.gender ||
    !body.email ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required..." }); // 400 - Bad response
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    gender: body.gender,
    email: body.email,
    jobTitle: body.job_title,
  });

  return res.status(201).json({ msg: "Success" });
});

app.listen(PORT, () => console.log("Server Started at port:", PORT));