const express = require("express");
const routes = express.Router();
const multer = require("multer");

const authMiddleware = require("./middlewares/auth");
const uploadConfig = require("./middlewares/upload");
const isAdmin = require("./middlewares/isAdmin");
const upload = multer(uploadConfig);
const authController = require("./controllers/authController");
const uploadController = require("./controllers/uploadController");

routes.post("/register", authController.store);
routes.post("/authenticate", authController.authenticate);

routes.get("/user/find", authMiddleware, authController.find);
routes.get(
  "/user/find/:username",
  authMiddleware,
  authController.findByUsername
);

routes.post(
  "/post/create/",
  authMiddleware,
  isAdmin,
  upload.array("images"),
  uploadController.create
);

routes.get("/post/find/:title", authMiddleware, uploadController.findByTitle);
routes.get("/post/find/", authMiddleware, uploadController.findAll);

module.exports = routes;
