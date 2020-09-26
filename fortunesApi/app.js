const express = require("express");
const bodyParser = require("body-parser");
const fortunes = require("./data/fortunes");

const app = express();
app.use(bodyParser.json());

app.get("/fortunes", (request, response) => {
  response.json(fortunes);
});

app.get("/fortunes/random", (request, response) => {
  response.json(fortunes[Math.floor(Math.random() * fortunes.length)]);
});

app.get("/fortunes/:id", (request, response) => {
  response.json(fortunes.find((f) => f.id == request.params.id));
});

module.exports = app;
