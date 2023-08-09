let http = require("http");

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let contentType = req.headers["content-Type"];
  var store = "";
  req.on("data", (chunk) => {
    store = store + chunk; // updating and storing data in chunks
  });
  req.on("end", () => {
    if (contentType === "application/json") {
      let paresedData = JSON.parse(store); // to read JSON formatt data
      res.write(store);
      console.log(contentType);
      res.end();
    } else {
      let stringData = JSON.stringify(store); // to read and convert form data in query formatt in to string object form
      res.write(stringData);
      console.log(contentType);
      res.end();
    }
  });
}

server.listen(7000, "localhost", () => {
  console.log("server is live");
});
