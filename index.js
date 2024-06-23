const express = require("express");
const mongooseConnect = require("./connection");
const urlpaths = require("./routes/urlpaths");
const path = require("path");
const cookieAuthentication = require('./middlewares/authentication');
const cookieParser = require('cookie-parser')

const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieAuthentication('userToken'));

app.set("view engine", "ejs");
app.set("views",path.resolve("./views"))

app.use("/blog", urlpaths);

app.get("/", (req, res) => {
  res.render("homepage",{
    user:req.user,
  })
});

app.use("/", (req, res, next) => {
  res.render("err");
});

app.listen(port, () => console.log("listening on port", port));
