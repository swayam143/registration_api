const express = require("express");
const hbs = require("hbs");
const path = require("path");
const Register = require("./models/registers");
require("./db/conn");

const app = express();

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

app.get("/register", (req, res) => {
  res.render("register");
});

app.listen(port, () => {
  console.log("Server is running");
});

//Note ===> in package.json we have to give   "dev": "nodemon src/app.js -e js,hbs" , to run all files like hbs we create on saving
