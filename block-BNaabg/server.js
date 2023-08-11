let http = require("http");
let fs = require("fs");
let url = require("url");

let usersPath = __dirname + "/users/";

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var parsedUrl = url.parse(req.url, true);
  var store = " ";
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    // handle all routes
    if (req.method === "POST" && req.url === "/users") {
      let username = JSON.parse(store).username;
      fs.open(usersPath + username + ".json", "wx", (err, fd) => {
        if (err) return console.log(err);
        fs.writeFile(fd, store, (err) => {
          if (err) return console.log(err);
          fs.close(fd, () => {
            res.end(`${username} created successfully`);
          });
        });
      });
    }
    // on get request read user details

    if (parsedUrl.pathname === "/users" && req.method === "GET") {
      let username = parsedUrl.query.username;

      fs.readFile(usersPath + username + ".json", (err, content) => {
        if (err) return console.log(err);
        res.setHeader("content-Type", "application/json");
        res.end(content);
      });
    }

    // update user data

    if (parsedUrl.pathname === "/users" && req.method === "PUT") {
      let username = parsedUrl.query.username;
      fs.open(usersPath + username + ".json", "r+", (err, fd) => {
        if (err) return console.log(err);
        fs.ftruncate(fd, (err) => {
          if (err) return console.log(err);
          fs.writeFile(fd, store, (err) => {
            if (err) return console.log(err);
            fs.close(fd, () => {
              res.end(`${username} updated successfully`);
            });
          });
        });
      });
    }

    // delete file
    if (parsedUrl.pathname === "/users" && req.method === "DELETE") {
      let username = parsedUrl.query.username;
      fs.unlink(usersPath + username + ".json", (err) => {
        if (err) return console.log(err);
        res.end(`${username} deleted successfully`);
      });
    }
  });
}

server.listen(4000, "localhost", () => {
  console.log("server is live");
});
