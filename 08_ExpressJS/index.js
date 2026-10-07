const express = require("express");

const app = express(); // Handler function

app.get("/", (req, res) => {
    return res.send("Hello from Home Page");
});

// We don't need to externally check for the path name (if query exist in the URL) 

app.get("/about", (req, res) => {
    return res.send(`Hello ${req.query.name}`);
});

// We don't even need to make a server. Express JS can handle it internally
app.listen(8000, () => console.log("Server Started"));