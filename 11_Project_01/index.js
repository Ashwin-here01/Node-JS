const express = require("express");
const users = require("./MOCK_DATA.json");
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
        fs.readFile("./MOCK_DATA.json", "utf-8", (err, data) => {
            if(err) {
                return res.json({response : "error"});
            }
            let parsedData = JSON.parse(data);
            for(bodyKey in body) {
                for(dataKey in parsedData[id-1]) {
                    if(bodyKey === dataKey) {
                        (parsedData[id-1])[dataKey] = body[bodyKey];
                    }
                }
            }
            fs.writeFile("./MOCK_DATA.json", JSON.stringify(parsedData), (err) => {
                if(err) {
                    return res.json({response : "error"});
                }
                return res.json({response : "success"});
            });
        });
    })

    .delete((req, res) => {
        const id = Number(req.params.id);
        const filteredUser = users.filter((user) => {return user.id !== id});
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(filteredUser), (err) => {
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