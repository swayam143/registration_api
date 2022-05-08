const express = require("express");

const hbs = require("hbs");

const path = require("path");

const Register = require("./models/registers");

const bcrypt = require("bcrypt");

const app = express();

require("./db/conn");

require("dotenv").config();

// Postman code to get data
// app.use(express.json());

//But to get data directly from any form by user
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

//Give static website path if have

// console.log(path.join(__dirname, "../public"));

const static_path = path.join(__dirname, "../public");

app.use(express.static(static_path));

//Using views engine for dynamic content in html file

const template_path = path.join(__dirname, "../templates/views");

app.set("view engine", "hbs");
app.set("views", template_path);

//Accessing partials like component in react

const partials_path = path.join(__dirname, "../templates/partials");

hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  //
  //   res.send("Hello from shubham");

  //Use view Enigne Template

  res.render("index");
});

// console.log(process.env.SECRET_KEY);

app.get("/register", (req, res) => {
  res.render("register");
});

//Create new user in Database

app.post("/register", async (req, res) => {
  try {
    const pass = req.body.pass;
    const cpass = req.body.cpass;
    if (pass === cpass) {
      // res.send("passwords are  matching");
      const registerEmployee = new Register({
        firstname: req.body.fname,
        lastname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        password: pass,
        confirmpassword: cpass,
      });

      //GENERATING WEB TOKEN

      const token = await registerEmployee.generateAuthToken();
      const registered = await registerEmployee.save();

      res.status(201).render("index");
    } else {
      res.send("passwords are not matching");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

//Signin Validation

app.post("/signin", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.pass;
    // console.log(`${email} and ${password}`);

    const userEmail = await Register.findOne({ email: email });
    // res.send(userEmail);

    //bycrypt password hashing

    const isMatch = bcrypt.compare(password, userEmail.password);

    //GENRATING JWT TOKEN ON LOGIN
    const token = await userEmail.generateAuthToken();
    console.log(token);

    if (isMatch) {
      res.status(201).render("index");
    } else {
      res.send("password are not matching");
    }
  } catch (e) {
    res.status(400).send("invalid email");
  }
});

//Usin bcrypt for data security

// const bcrypt = require("bcrypt");
// const securePassword = async (password) => {
//   const passwordHash = await bcrypt.hash(password, 10);
//   console.log(passwordHash);

//   //to get password when user login simply use .compare
//   const passwordMatch = await bcrypt.compare(password, passwordHash);
//   console.log(passwordMatch);
// };

// securePassword("thapa@123");

app.listen(port, () => {
  console.log("Server is running");
});

//Note ===> in package.json we have to give   "dev": "nodemon src/app.js -e js,hbs" , to run all files like hbs we create on saving
