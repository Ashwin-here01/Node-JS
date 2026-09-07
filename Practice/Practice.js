const file = require("fs");
const http = require("http");

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
*/

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