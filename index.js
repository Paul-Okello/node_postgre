const http = require("http");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  const { url } = req;
  console.log(url);
  const translations = {
    1: "One",
    2: "Two",
    3: "Three",
  };
  if (url == "/translations") {
  }
  res.setHeader("content-Type", "application/json");
  res.write(JSON.stringify(translations));
  res.end();

  res.end("Welcome to node");
});

server.listen(port, hostname, () => {
  console.log(`Server running at ${hostname}: ${port}`);
});
