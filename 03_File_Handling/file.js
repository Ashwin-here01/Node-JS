const fs = require("fs");

// File creation and writing
// Synchronous call
fs.writeFileSync("./test.txt", "Hello World!");

// Ansynchronous call
fs.writeFile("./testa.txt", "Hello World Async!", (err) => {});


// File reading
// Synchronous
const str = fs.readFileSync("./contacts.txt", "utf-8");
console.log(str);

// Asynchronous
fs.readFile("./contacts.txt", "utf-8", (err, result) => {
    if(err) console.log(err);
    else console.log(result);
});


// Appending data in File
fs.appendFileSync("./test.txt", new Date().toString());


// Copying file
fs.cpSync("./test.txt", "./copy.txt");


// Deleting file
// fs.unlinkSync("./copy.txt");


// Looking at the stats
console.log(fs.statSync("./test.txt"));


// Making directories
fs.mkdirSync("./newFolder/a/b/c", {recursive : true});