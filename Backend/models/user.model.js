const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    default: "avatar.png",
  },
  watchlist: [
    {
      type: Number,
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
