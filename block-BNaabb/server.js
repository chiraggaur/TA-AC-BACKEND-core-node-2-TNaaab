let http = require("http");

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var store = " ";
  req.on("data", (chunk) => {
    store = store + chunk;
  });
  req.on("end", () => {
    console.log(store);
  });
}

server.listen(4000, "localhost", () => {
  console.log("server is live");
});
