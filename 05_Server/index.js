const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  // console.log("New Request Received");
  // console.log(req.headers);
  const log = `${Date.now()}: ${req.url} Request Recieved\n`;
  fs.appendFile("./log.txt", log, () => {
    // res.end("Hello from Server");
    switch (req.url) {
      case "/":
        res.end("Home Page");
        break;
      case "/about":
        res.end("My name is Harry");
        break;
      default:
        res.end("404 Page not found");
        break;
    }
  });
});

myServer.listen(8000, () => {
  console.log("Server Started");
});
