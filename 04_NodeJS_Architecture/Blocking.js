const fs = require("fs");

console.log("1");

// Synchrounous Blocking...
const result = fs.readFileSync("../03_File_Handling/contacts.txt", "utf-8");
console.log(result);

console.log("2");
console.log("3");

// We need Thread (Workers) to execute blocking requests...
// Threads are limited...
// Default Thread Pool Size = 4
// Max - No. of CPU cores

const os = require("os");

console.log(os.cpus().length); // 12 Therefore, max threads (workers) = 12