let http = require("http");
let fs = require("fs");
let qs = require("querystring");

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  if (req.method === "GET" && req.url === "/form") {
    // fs.createReadStream("./form.html").pipe(res);
    store = "";
    req.on("data", (chunk) => {
      store = store + chunk;
    });
    req.on("end", () => {
      let parseddata = qs.parse(store);
      res.write(JSON.stringify(parseddata));
      res.end();
    });
  }
}
server.listen(5678, "localhost", () => {
  console.log("server created successfully");
});
