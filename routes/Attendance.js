let express = require("express");
let router = express();
let User = require("../models/SignUp");
let Attendance = require("../models/Attendance");
let moment = require("moment");


router.post("/today", (req, res) => {
  let data = Object.assign({}, req.body);
  let { _id } = data;
  console.log(moment());
  _id = _id.trim();
  User.findOne({ _id }).then((user) => {
    if (!user) {
      return res.status(200).json("You are a Unknown User.");
    }
    Attendance.findOne({ attendance_of: _id }).then((attend) => {
      if (attend) {
        var a = moment(attend.time_in);
        var b = moment();
        var timeDiff = b.diff(a, "minutes");
        console.log(timeDiff);
        if (timeDiff >= 10) {
          let obj = {
            time_out: moment()._d,
          };
          Attendance.findByIdAndUpdate({ _id: attend._id }, obj).then((doc) => {
            res.status(200).json("Your time out has been noted.");
          });
        }
        if (timeDiff < 10) {
          res
            .status(200)
            .json("You marked your attendance before " + timeDiff + " minutes ago.");
        }
      }
      if (!attend) {
        const newUser = new Attendance({
          firstname: user.firstname,
          lastname: user.lastname,
          roll_no: user.roll_no,
          class: user.class,
          session: user.session,
          time_in: moment()._d,
          attendance_of: _id,
        });
        newUser
          .save()
          .then((doc) => {
            res.status(200).json("Your attendance has been marked.");
          })
          .catch((err) => {
            res.status(400).json("Please fill all the fields.");
          });
      }
    });
  });
});

router.get("/get_all_attendance", (req, res) => {
  Attendance.find({}).then((user) => {
    res.status(200).json(user);
  });
});

module.exports = router;
