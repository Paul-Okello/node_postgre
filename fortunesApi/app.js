const fs = require("fs");
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

const writeFortunes = (json) => {
  fs.writeFile("./data/fortunes.json", JSON.stringify(json), (error) => {
    console.log(error);
  });
};

app.post("/fortunes", (request, response) => {
  const { message, luckyNumber, spiritAnimal } = request.body;

  const fortuneIds = fortunes.map((f) => f.id);

  const newFortunes = fortunes.concat({
    id: (fortuneIds.length > 0 ? Math.max(...fortuneIds) : 0) + 1,
    message,
    luckyNumber,
    spiritAnimal,
  });
  writeFortunes(newFortunes);
  response.json(newFortunes);
});

app.put("/fortunes/:id", (request, response) => {
  const { id } = request.params;

  const oldFortune = fortunes.find((f) => f.id == id);

  ["message", "luckyNumber", "spiritAnimal"].forEach((key) => {
    if (request.body[key]) oldFortune[key] = request.body[key];
  });
  writeFortunes(fortunes);
  response.json(fortunes);
});
module.exports = app;
