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
  roll_no: {
    type: String,
    required: false,
  },
  class: {
    type: String,
    required: false,
  },
  session: {
    type: String,
    required: false,
  },
  time_in: {
    type: Date,
    required: false,
  },
  time_out: {
    type: Date,
    required: false,
  },
  attendance_of: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true

  }
});

let User = mongoose.model("Attendance", userSchema);

module.exports = User;
