const express = require("express");
let users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

// Middleware - Plugin
app.use(express.urlencoded({extended : false}));

// Routes
app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    return res.send(html);
});

// REST API

app.get("/api/users", (req, res) => {
    return res.json(users);
});

app
    .route("/api/users/:id")
    
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => id === user.id);
        return res.json(user);
    })

    .patch((req, res) => {
        const body = req.body;
        const id = Number(req.params.id);

        for(bodyKey in body) {
            for(userKey in users[id-1]) {
                if(bodyKey === userKey) {
                    (users[id-1])[userKey] = body[bodyKey];
                }
            }
        }
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
            if(err) {
                return res.json({response : "error"});
            }
            return res.json({response : "success"});
        });
    })

    .delete((req, res) => {
        const id = Number(req.params.id);
        users = users.filter((user) => {return user.id !== id});
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
            if(err) {
                return res.json({response : "error"});
            }
            return res.json({response : "success"});
        });
    });

app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({id: users.length + 1, ...body});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({status : "success", id: users.length});
    });
});

app.listen(PORT, () => console.log("Server Started at port:", PORT));