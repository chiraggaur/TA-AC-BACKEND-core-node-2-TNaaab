let http = require("http");

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var store = " ";
  req.on("data", (chunk) => {
    store = store + chunk;
  });
  req.on("end", () => {
    res.write(store);
    console.log();
    res.end();
  });
}

server.listen(4000, "localhost", () => {
  console.log("server is live");
});
