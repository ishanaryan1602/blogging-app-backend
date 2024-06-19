const express = require("express");
const mongooseConnect = require("./connection");
const urlpaths = require("./routes/urlpaths");

const app = express();

const port = 3000;

app.use("/", urlpaths);

app.use("/", (req, res, next) => {
  res.send("error loading this page");
});

app.listen(port, () => console.log("listening on port", port));
