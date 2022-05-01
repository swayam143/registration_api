const express = require("express");

const path = require("path");
require("./db/conn");

const app = express();

const port = process.env.PORT || 3000;

//Give static website path if have

// console.log(path.join(__dirname, "../public"));

const static_path = path.join(__dirname, "../public");

app.use(express.static(static_path));

//Using views engine for dynamic content in html file

app.set("view engine", "hbs");

app.get("/", (req, res) => {
  //
  //   res.send("Hello from shubham");

  //Use view Enigne Template

  res.render("index");
});

app.listen(port, () => {
  console.log("Server is running");
});
