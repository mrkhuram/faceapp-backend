let express = require("express");
let expressSession = require("express-session");
let bodyParser = require("body-parser");
let app = express();
// let passport = require("./config/passportConfig");
require("./config/mongo");
let PORT = 8080;
let User = require("./models/SignUp");
let userRoutes = require("./routes/Auth");
let Attendance = require("./routes/Attendance");
let cors = require("cors");
let cookieParser = require("cookie-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieParser(
    "This is the secret that will use for the backend of the blood locatorrr..."
  )
);
app.use(
  expressSession({
    secret:
      "This is the secret that will use for the backend of the recoginations system of face with matching...",
    maxAge: 3600000,
    resave: true,
    saveUninitialized: true,
  })
);


app.get("/", (req, res) => {
  res.send("Welcome to the backend of blood locator.");
});

app.use("/user", userRoutes);
app.use("/attendance_mark", Attendance);
app.use("/uploads", express.static("uploads/"));

app.listen(process.env.PORT || PORT, () => {
  console.log("Now I am chaling " + PORT);
});
 