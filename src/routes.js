const express = require("express");
const routes = express.Router();
const authMiddleware = require("./middlewares/auth");

routes.use("/auth", authMiddleware);
const authController = require("./controllers/authController");
const projectController = require("./controllers/projectController");

routes.post("/register", authController.store);
routes.post("/authenticate", authController.authenticate);
routes.get("/auth", projectController.test);

module.exports = routes;
