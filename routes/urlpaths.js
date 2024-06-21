const express = require("express");
const userModel = require("../models/userModel");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("hello this is from the test route");
});


router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  let { username, email, password } = req.body;
  let user = await userModel.create({ username, password, email });
  console.log(user);
  res.redirect("login");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userToken = await userModel.matchPwdAndGenUserToken(email, password);
    if (userToken) {
      console.log("success with token :", '"', userToken, '"');
      return res.cookie("userToken", userToken).redirect("login");
    }
    console.log("wrong credentials");
    res.redirect("login");
  } catch (err) {
    res.render("login",{
      pageError: err.message
    });
  }
});

module.exports = router;
