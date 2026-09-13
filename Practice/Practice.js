const file = require("fs");
const http = require("http");
const url = require("url");

/*
const {sum, sub, mul, div} = require("./mathFn");

// console.log(math);

console.log(sum(5, 5));

// file.mkdirSync("./TextFiles");

file.writeFileSync("./TextFiles/01.txt", "This is for practice");
// setTimeout(() => {
//     file.appendFileSync("./TextFiles/01.txt", "! And my name is Harry");
// }, 3000);

const result = file.readFileSync("./TextFiles/01.txt", "utf-8");
console.log(result);

file.readFile("./TextFiles/01.txt", "utf-8", (err, result) => {
    if(err) console.log("Error: ", err);
    else console.log(result);
});

// file.copyFileSync("./TextFiles/01.txt", "./TextFiles/02CopiedFile.txt");

// file.unlinkSync("./TextFiles/02CopiedFile.txt");


const myServer = http.createServer((req, res) => {
    console.log("Request Received");
    console.log(req.url);
    res.write("Under maintenace\n");
    res.end("My name is Harry!");
});

myServer.listen(8000, () => {
    console.log("Server started");
});

const newServer = http.createServer((req, res) => {
    console.log("Request Recieved");
    console.log(req.headers);
    console.log(req.url);
    res.write("This is a response\n");
    res.end("The response is ended");
});

newServer.listen(8001, () => {
    console.log("Server started");
});

*/

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();

  const log = `${Date.now()} ${req.url} Request Recieved\n`;

  const myURL = url.parse(req.url, true);

  console.log(myURL);

  file.appendFile("TextFiles/log.txt", log, () => {
    switch (myURL.pathname) {
      case "/":
        res.end("Home Page");
        break;
      case "/about":
        res.end(`Hi ${myURL.query.name}, Your Roll No. is ${myURL.query.roll}`);
        break;
      case "/contact":
        res.end("E-Mail: abc@gmail.com");
        break;
      default:
        res.end("404 Page not found");
    }
  });
});

myServer.listen(9000, () => {
  console.log("Server Started");
});
