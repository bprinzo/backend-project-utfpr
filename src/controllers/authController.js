const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

const User = mongoose.model("User");

function tokenGenerator(params) {
  return jwt.sign(params, authConfig.secret, { expiresIn: 86400 });
}

module.exports = {
  async store(request, response) {
    const { email, username } = request.body;
    try {
      if (await User.findOne({ username }))
        return response.status(400).send("User already exists");

      if (await User.findOne({ email }))
        return response.status(400).send("Email already exists");

      const user = await User.create(request.body);

      user.password = undefined;

      return response.json({
        user,
        token: tokenGenerator({ user, id: user.id }),
      });
    } catch (error) {
      return response.status(400).send({ error: "Registration failed" });
    }
  },
  async authenticate(request, response) {
    const { username, password } = request.body;

    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      return response.status(400).send({ error: "User not found" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return response.status(400).send({ error: "Invalid password" });
    }

    user.password = undefined;
    response.json({
      user,
      token: tokenGenerator({
        user,
        id: user.id,
        administrator: user.administrator,
      }),
    });
  },

  async find(request, response) {
    const user = await User.find();
    return response.send(user);
  },

  async findByUsername(request, response) {
    const user = await User.findOne({
      username: { $regex: request.params.username },
    });
    if (!user) {
      response.status(400).send({ error: "User not found" });
    }
    return response.send(user);
  },
};
