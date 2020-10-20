const express = require("express");

module.exports = {
  async test(request, response) {
    response.json({ ok: true, user: request.userId });
  },
};
