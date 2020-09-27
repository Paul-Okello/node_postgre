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

app.post("/fortunes", (request, response) => {
  const { message, luckyNumber, spiritAnimal } = request.body;

  const fortuneIds = fortunes.map((f) => f.id);

  const newFortunes = fortunes.concat({
    id: (fortuneIds.length > 0 ? Math.max(...fortuneIds) : 0) + 1,
    message,
    luckyNumber,
    spiritAnimal,
  });
  fs.writeFile("./data/fortunes.json", JSON.stringify(newFortunes), (error) =>
    console.log(error)
  );
  response.json(newFortunes);
});

app.put("/fortunes/:id", (request, response) => {
  const { id } = request.params;
  const { message, luckyNumber, spiritAnimal } = request.body;

  const oldFortune = fortunes.find((f) => f.id == id);

  oldFortune.message = message;
  oldFortune.luckyNumber = luckyNumber;
  oldFortune.spiritAnimal = spiritAnimal;

  fs.writeFile("./data/fortunes.json", JSON.stringify(fortunes), (error) =>
    console.log(error)
  );
  response.json(fortunes);
});
module.exports = app;
