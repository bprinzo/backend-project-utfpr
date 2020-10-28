const express = require("express");
const mongoose = require("mongoose");
const imageView = require("../views/images_views");

const Upload = mongoose.model("Upload");
const User = mongoose.model("User");

module.exports = {
  async create(request, response) {
    const { text, title } = request.body;

    if (!title) {
      return response.status(400).send({ error: "Title is required" });
    }

    const requestImages = request.files;

    const images = await requestImages.map((image) => {
      return { path: image.filename };
    });

    const image = imageView.render(images);

    const data = {
      title,
      text,
      image,
    };

    const post = await Upload.create(data);

    return response.send({
      post,
      user: request.userId,
      administrator: request.isAdmin,
    });
  },
  async findByTitle(request, response) {
    const post = await Upload.find({
      title: { $regex: request.params.title, $options: "i" },
    });

    if (!post) {
      response.status(400).send({ error: "Title not found" });
    }
    return response.send(post);
  },

  async findAll(request, response) {
    const post = await Upload.find();
    return response.send(post);
  },
};
