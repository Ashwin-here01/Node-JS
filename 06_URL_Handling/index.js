const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}: ${req.url} Request Recieved\n`;
  
  const myUrl = url.parse(req.url, true); // true - It'll automatically differentiate the querries
  console.log(myUrl);

  fs.appendFile("./log.txt", log, () => {
    switch (myUrl.pathname) {
      case "/":
        res.end("Home Page");
        break;
      case "/about":
        res.end(`Hi ${myUrl.query.myname}!`);
        break;
      case "/search":
        const search = myUrl.query.search_query;
        res.end("Here are your result for " + search);
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
