const jwt = require("jsonwebtoken");

const Register = require("../models/registers");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    //here we match the cookie stored in the browser and user secret key if matches then secret page shows
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(verifyUser);

    //matching userId with stored jwt id
    const user = await Register.findOne({ _id: verifyUser._id });
    // console.log(user.firstname);

    //LOGOUT FUNCTIONILTY

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = auth;
