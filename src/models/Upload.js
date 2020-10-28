const mongoose = require("mongoose");

const UploadSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
  },
  text: {
    type: "string",
  },
  image: {
    url: {
      type: "string",
    },
  },
});
mongoose.model("Upload", UploadSchema);
