let express = require("express");
let router = express();
let User = require("../models/SignUp");
let Admin = require("../models/Admin");
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


router.post("/register_admin", (req, res) => {
  const { firstname, email, password,lastname, phone } = req.body;

  //simple Validation
  if (!firstname || !email || !password || !lastname || !phone) {
    return res.status(200).json({ msg: "Please enter all fields" });
  }

  //Check for existence
  Admin.findOne({ email }).then(user => {

    if (user) {
      return res.status(200).json({ msg: "Email already exist" });
    }
    const newUser = new Admin({
      firstname, email, password, lastname, phone    });

    //Create Salt & Hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;
        newUser.save().then(user => {

          res.json({
            user
          });
        }
        );

      });
    });
  });
});


router.post("/login", (req, res) => {
  const { email, password } = req.body;
  //simple Validation


  //simple Validation
  if (!email || !password) {
    return res.status(400).json({ msg: "please enter all fields" });
  }

  //Check for existence
  Admin.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({ msg: "user does not exist " });
    }

    // Validate password
    bcrypt.compare(password, user.password, (err, result) => {
      if (!result) return res.status(400).json({ msg: "Invalid Credentials" })
      res.json({
        user
      });
    })


  });
});



module.exports = router;
