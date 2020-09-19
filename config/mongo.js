let mongoose = require("mongoose");
// let path = "mongodb+srv://plant:plant@plantslovers.cwtce.mongodb.net/face?retryWrites=true&w=majority"
let path = "mongodb+srv://face:face@faceapp.1jltl.mongodb.net/face_app?retryWrites=true&w=majority"
mongoose
  .connect(
    path
    ,

    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, connection) => {
      console.log(err || connection);
    }
  )
  .then(() => {
    console.log("db connected");
  });
