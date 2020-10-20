const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = mongoose.model("User");

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

      return response.json(user);
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

    response.json(user);
  },
};