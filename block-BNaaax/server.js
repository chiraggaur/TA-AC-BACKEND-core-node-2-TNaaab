// console.log(__dirname);
// console.log(__filename);

const { Server } = require("http");
let path = require("path");

let absolutePath = path.join(__dirname, "Server.js");

console.log(absolutePath);
