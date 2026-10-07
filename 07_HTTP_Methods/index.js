/*
5 Methods:
    GET
    POST
    PUT
    PATCH
    DELETE
*/

const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    if(req.url === "/favicon.ico") res.end();

    const log = `${Date.now()}: ${req.method} ${req.url} Request Received`;

    const myURL = url.parse(req.url, true);

    fs.appendFile("./log.txt", log, () => {
        switch(myURL.pathname) {
            case "/":
                if(req.method === "GET") res.end("HomePage");
                break;
            case "/about":
                res.end(`Hi ${myUrl.query.myname}!`);
                break;
            case "/search":
                const search = myUrl.query.search_query;
                res.end("Here are your result for " + search);
                break;
            case "/signup":
                if(req.method === "GET") res.end("This is a sign up form");
                else if(req.method === "POST") {
                    // DB query
                    res.end("Sign up successfull");
                }
            default:
                res.end("404 Page not found");
                break; 
        }
    });
});

myServer.listen(8000, () => {
    console.log("Server Started");
});