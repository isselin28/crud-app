const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();

app.listen(3000, function () {
  console.log("listening on 3000");
});

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

const connectionString =
  "mongodb+srv://isselin28:codingPass@cluster0.zswsc.mongodb.net/test?retryWrites=true&w=majority";

// MongoClient.connect(
//   connectionString,
//   { useUnifiedTopology: true },
//   (err, client) => {
//     if (err) return console.error(err);
//     console.log("Connected to Database");
//   }
// );

MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(
  (client) => {
    console.log("Connected to Database!");
    const db = client.db("star-wars-quotes");
    const quotesCollection = db.collection("quotes");

    // setting initial library
    app.set("view engine", "ejs");
    // app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));

    app.get("/", (req, res) => {
      //   res.sendFile(__dirname + "/index.html");

      db.collection("quotes")
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { quotes: results });
        })
        .catch((error) => console.error(error));
    });

    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    console.log("end");

    // app.get("/", (req, res) => {
    //   db.collection("quotes")
    //     .find()
    //     .toArray()
    //     .then((results) => {
    //       console.log(results);
    //       console.log("helo");
    //     })
    //     .catch((error) => console.error(error));
    // });
  }
);
