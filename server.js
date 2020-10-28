const express = require("express");
const requireDir = require("require-dir");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

requireDir("./src/models");

app.use("/api", require("./src/routes"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(3001);
