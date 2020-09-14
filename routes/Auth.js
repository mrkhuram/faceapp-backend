let express = require("express");
let router = express();
let User = require("../models/SignUp");
let bcrypt = require("bcrypt");
let passport = require("../config/passportConfig");
let Upload = require("../config/multer");

router.post("/add_user", Upload.any(""), (req, res) => {
  let data = Object.assign({}, req.body);
  let { firstname, lastname, email, d_o_b, gender } = data;
  if (!firstname || !lastname || !email || !d_o_b || !gender) {
    return res.status(200).json({ msg: "Please enter all fields" });
  }

  let img = req.files[0].originalname;

  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(200).json({ msg: "User already exist " });
    }
    const newUser = new User({...data,img});
    newUser
      .save()
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(400).json( "Please fill all the fields." );
      });
  });
});

router.get("/get_user", (req, res) => {
  User.find({}).then((user) => {
    res.status(200).json(user);
  });
});

module.exports = router;
