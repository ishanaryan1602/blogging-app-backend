const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  this.password = hash;
  next();
});

userSchema.static("matchPwd", async function (email, password) {
  const user = await this.findOne({ email }).lean();
  if (!user) throw new Error("User not found");
  else {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      console.log(isMatch);
      return {...user,password:undefined};
    } else throw new Error("Invalid password");
  }
});

module.exports = mongoose.model("User", userSchema);
