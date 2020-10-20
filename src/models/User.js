const mongoose = require("../database/connection");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: "string",
    require: true,
  },
  lastName: {
    type: "string",
    require: true,
  },
  username: {
    type: "string",
    require: true,
    unique: true,
  },
  email: {
    type: "string",
    require: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: "string",
    require: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model("User", UserSchema);
