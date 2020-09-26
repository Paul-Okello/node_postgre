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
  console.log(request.body);
  const { message, luckyNumber, spiritAnimal } = request.body;

  const fortuneIds = fortunes.map((f) => f.id);
  const fortune = {
    id: (fortuneIds.length > 0 ? Math.max(...fortuneIds) : 0) + 1,
    message,
    luckyNumber,
    spiritAnimal,
  };

  const newFortunes = fortunes.concat(fortune);
  response.json(newFortunes);
});
module.exports = app;
