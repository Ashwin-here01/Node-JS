const fs = require("fs");

console.log("1");

// Asynchronous Non-Blocking...
fs.readFile("../03_File_Handling/contacts.txt", "utf-8", (err, result) => {
    console.log(result);
});

console.log("2");
console.log("3");

// Try to only use Non-Blocking requests always (Since it doesn't use Threads)...