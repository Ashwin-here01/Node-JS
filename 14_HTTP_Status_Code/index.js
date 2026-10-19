const express = require("express");
let users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

// Middleware - Plugin
app.use(express.urlencoded({ extended: false })); // It looks into the content-type in req headers and only runs when option matches

app.get("/api/users", (req, res) => {
  res.setHeader("X-myName", "Harry"); // Setting custom headers
  // Always add X in front of a custom header (good practice)

  console.log(req.headers); // Viewing request headers
  return res.json(users);
});

app
  .route("/api/users/:id")

  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => id === user.id);
    if(!user) return res.status(404).json({error : "User not found!"});
    return res.json(user);
  })

  .patch((req, res) => {
    const body = req.body;
    const id = Number(req.params.id);

    for (bodyKey in body) {
      for (userKey in users[id - 1]) {
        if (bodyKey === userKey) {
          users[id - 1][userKey] = body[bodyKey];
        }
      }
    }
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        return res.json({ response: "error" });
      }
      return res.json({ response: "success" });
    });
  })

  .delete((req, res) => {
    const id = Number(req.params.id);
    users = users.filter((user) => {
      return user.id !== id;
    });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        return res.json({ response: "error" });
      }
      return res.json({ response: "success" });
    });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  if(!body || !body.first_name || !body.last_name || !body.gender || !body.email || !body.job_title) {
    return res.status(400).json({msg : "All fields are required..."}); // 400 - Bad response
  }
  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "success", id: users.length }); // Setting custom status codes (When smth "created" - 201)
  });
});

app.listen(PORT, () => console.log("Server Started at port:", PORT));
