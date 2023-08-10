let http = require("http");
let fs = require("fs");
let qs = require("querystring");

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let store = " ";

  req.on("data", (chunk) => {
    store += chunk;
  });

  req.on("end", () => {
    if (req.method === "GET" && req.url === "/form") {
      res.setHeader("content-Type", "text/html");
      fs.createReadStream("./form.html").pipe(res);
    }
    if (req.method === "POST" && req.url === "/form") {
      let parsedObject = qs.parse(store);
      res.setHeader("content-Type", "text/html");
      res.write(`<h2> ${parsedObject.name}</h2>`);
      res.write(`<h2> ${parsedObject.age}</h2>`);
      res.write(`<h2> ${parsedObject.email}</h2>`);
      res.end();
    }
  });
}
server.listen(5678, "localhost", () => {
  console.log("server created successfully");
});
