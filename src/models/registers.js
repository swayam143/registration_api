const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const employeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  //jwt token
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//GENERATING WEB TOKEN

employeeSchema.methods.generateAuthToken = async function () {
  try {
    const jwttoken = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    //saving token in database
    this.tokens = this.tokens.concat({ token: jwttoken });
    await this.save();
    // console.log(token);
    return jwttoken;
  } catch (error) {
    console.log("error in generating token");
  }
};

//BCRYPT PASSWORD HASHING

//pre is for registration because it runs before .save() method
employeeSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);

  this.confirmpassword = await bcrypt.hash(this.password, 10);
  next();
});

// For converting bcrypt password to plain text on login visit app.js sigin section
// const isMatch = bcrypt.compare(password, userEmail.password);

const Register = new mongoose.model("Register", employeeSchema);

module.exports = Register;
