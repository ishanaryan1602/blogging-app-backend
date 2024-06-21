const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const genToken = require("../utils/genToken");
const verifyToken = require("../utils/verifyToken");

const userSchema = new mongoose.Schema(
  {
    usename: String,
    password: String,
    email: String,
    profleImageUrl: String,
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash
  next();
});

userSchema.static("matchPwdAndGenUserToken", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");
  else {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      console.log('user match : ', isMatch);
      const userToken = genToken(user);
      return userToken;
    } else throw new Error("Invalid password");
  }
});

module.exports = mongoose.model("User", userSchema);
