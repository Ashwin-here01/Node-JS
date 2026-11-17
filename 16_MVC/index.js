const express = require("express");
const { logReqRes } = require("./middlewares"); // It by default picks index.js file (no need to specify)
const { connectMongoDb } = require("./connection");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

// Connecting MongoDB
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("Error:", err);
  });

// Middleware - Plugin
app.use(express.urlencoded({ extended: false })); // It looks into the content-type in req headers and only runs when option matches
app.use(logReqRes("log.txt"));

// Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log("Server Started at port:", PORT));
