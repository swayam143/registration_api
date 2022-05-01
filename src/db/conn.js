const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/registrationemployee")
  .then(() => {
    console.log("connection successfull");
  })
  .catch((e) => {
    console.log(e);
  });
