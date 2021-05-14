const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();

const update = document.querySelector("#update-button");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

update.addEventListener("click", (_) => {
  fetch("/quotes", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Darth Vadar",
      quote: "I find your lack of faith disturbing.",
    }),
  });

  app.put("/quotes", (req, res) => {
    console.log(req.body);
  });
});
