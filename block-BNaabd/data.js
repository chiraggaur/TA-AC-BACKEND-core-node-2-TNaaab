let http = require("http");
let qs = require("querystring");

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  console.log(req.headers);
  var store = "";
  req.on("data", (chunk) => {
    store = store + chunk; // updating and storing data in chunks
  });
  req.on("end", () => {
    if (req.method === "POST" && req.url === "/json") {
      res.setHeader("content-Type", "application/json");
      res.write(store);
      res.end();
    }
    if (req.method === "POST" && req.url === "/form") {
      let stringData = qs.parse(store); // to read and convert form data in query formatt in to string object form
      res.setHeader("content-Type", "application/x-www-form-urlencoded");
      res.write(JSON.stringify(stringData));
      res.end();
    }
  });
}

server.listen(7000, "localhost", () => {
  console.log("server is live");
});
