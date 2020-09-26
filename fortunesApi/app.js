const express = require("express");
const fortunes = require("./data/fortunes");

const app = express();

app.get("/fortunes", (request, response) => {
  response.json(fortunes);
});

app.get("/fortunes/random", (request, response) => {
  console.log("Requesting random fortune");

  const randomIndex = Math.floor(Math.random() * fortunes.length);

  const rFortune = fortunes[randomIndex];
  response.json(rFortune);
});

module.exports = app;
