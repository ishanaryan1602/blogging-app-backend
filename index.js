const express = require("express");
const mongooseConnect = require("./connection");
const urlpaths = require("./routes/urlpaths");
const path = require("path");

const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ encoded: true }));

app.set("view engine", "ejs");
app.set("views",path.resolve("./views"))

app.use("/blog", urlpaths);

app.use("/", (req, res, next) => {
  res.render("err");
});

app.listen(port, () => console.log("listening on port", port));
