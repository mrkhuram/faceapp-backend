let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  phone: {
      type: Number,
      required: false
  }
  
});

let User = mongoose.model("Admin", userSchema);

module.exports = User;
