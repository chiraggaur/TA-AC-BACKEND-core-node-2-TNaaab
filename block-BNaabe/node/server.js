// #### Path

// Q. Suppose we have 3 files inside a directory on desktop
// The structure is

// - node(folder) - app.js - server.js - index.html
//   You are currently inside server.js

// Write code to

// - capture absolute path of `server.js`(itself)
// - get absolute path of `app.js`
// - get realtive path of `index.html`
// - get absolute path of `index.html` using `path module`

//answer

// let http = require("http");
// let fs = require("fs");
// let path = require("path");

// let server = http.createServer(handleRequest);

// function handleRequest(req, res) {
//   console.log(path.join(__filename));
//   console.log(__dirname + "/app.js");
//   console.log("./index.html");
//   console.log(path.join(__dirname) ,"index.html");
//   res.end();
// }

// server.listen(4444, "localhost", () => {
//   console.log("server is live");
// });

// #### Capture data on server

// Q. Create a server using http

// - handle post method on '/' route
// - send json data on it from postman

// ```js
// // data format is
// {
//   team: 'kxip',
//   players: 18,
//   captain: 'KL Rahul'
// }
// ```

// - capture data from request on server side using data and end event on request object
// - when end event fires, send entire captured data in response with status code 201.

// answer

// let http = require("http");

// let server = http.createServer(handleRequest);

// function handleRequest(req, res) {
//   var store = "";
//   if (req.method === "POST" && req.url === "/") {
//     req.on("data", (chunk) => {
//       store += chunk;
//     });
//     req.on("end", () => {
//       res.statusCode = 201;
//       res.write(store); // already a stringify data because we can only send string or buffer data in http req
//       res.end();
//     });
//   }
// }

// server.listen(7000, "localhost", () => {
//   console.log("server is live ");
// });

// Q. Follow above steps with form data from postman instead of json data.

// - once data has been captured, send only captain's name in response.

// let http = require("http");
// let qs = require("querystring");

// let server = http.createServer(handleRequest);

// function handleRequest(req, res) {
//   var store = "";
//   if (req.method === "POST" && req.url === "/") {
//     req.on("data", (chunk) => {
//       store += chunk;
//     });
//     req.on("end", () => {
//       res.statusCode = 201; // header content type check doubt
//       res.setHeader("content-Type", "application/x-www-form-urlencoded");
//       let parsedString = qs.parse(store);
//       res.write(JSON.stringify(parsedString));
//       res.end();
//     });
//   }
// }

// server.listen(7000, "localhost", () => {
//   console.log("server is live ");
// });

// Q. Create server which can handle both json/form data without specifying which format of data is being received.

// - add listener on port 9000
// - use `data/end` event to capture json/form data
// - use `req.headers['Content-Type']` to check data format
// - parse respective data format i.e. json/form
// - send entire data in response
// - data sent from postman should have fields:
//   - city
//   - state
//   - country
//   - pin

let http = require("http");
let qs = require("querystring");

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var store = "";
  if (req.method === "POST" && req.url === "/") {
    req.on("data", (chunk) => {
      store += chunk;
    });
    req.on("end", () => {
      if (req.headers["content-type"] === "application/json") {
        let parseddata = JSON.parse(store);
        res.write(store);
        res.end();
      }
      if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
        let parseddata = qs.parse(store);
        res.write(JSON.stringify(parseddata));
        res.end();
      }
    });
  }
}

server.listen(9000, "localhost", () => {
  console.log("server is live ");
});

// Q. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.

// - format of json data is {name: your name, email: "", }
// - Html response format is <h1>Name</h1><h2>email</h2>

// let http = require("http");

// let server = http.createServer(handleRequest);

// function handleRequest(req, res) {
//   var store = "";
//   if (req.method === "POST" && req.url === "/json") {
//     req.on("data", (chunk) => {
//       store += chunk;
//     });
//     req.on("end", () => {
//       res.setHeader("content-Type", "text/html");
//       let parseddata = JSON.parse(store);
//       let name = parseddata.name;
//       let email = parseddata.email;
//       res.write(`<h1> ${name}</h1>`);
//       res.write(`<h2> ${email}</h2>`);
//       res.end();
//     });
//   }
// }

// server.listen(9000, "localhost", () => {
//   console.log("server is live ");
// });

// Q. Follow above question with form data containing fields i.e name and email.

// - Parse form-data using `querystring` module
// - respond with HTML page containing only email from data in H2 tag.

// let http = require("http");
// let qs = require("querystring");

// let server = http.createServer(handleRequest);

// function handleRequest(req, res) {
//   var store = "";
//   if (req.method === "POST" && req.url === "/form") {
//     req.on("data", (chunk) => {
//       store += chunk;
//     });
//     req.on("end", () => {
//       res.setHeader("content-Type", "text/html");
//       let parseddata = qs.parse(store);
//       let email = parseddata.email;
//       res.write(`<h2> ${email}</h2>`);
//       res.end();
//     });
//   }
// }

// server.listen(9000, "localhost", () => {
//   console.log("server is live ");
// });
