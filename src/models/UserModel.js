const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    validate: (value) => {
      if (value < 0) {
        throw new Error("Age Must be Positive number");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlenght: 7,
    validate(value) {
      if (value.includes("password") || value.length < 6) {
        throw new Error("Password shouldn't contain password");
      }
    },
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: (email) => {
      if (!validator.isEmail(email)) {
        throw new Error("Invalide Email id");
      }
    },
  },
});

module.exports  = User;
