const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./Employee");

app.use(bodyParser.json());

const Employee = mongoose.model("employee");

// pasword = DWEXIUbban47iQ80

const mongoUri =
  "mongodb+srv://cnq:DWEXIUbban47iQ80@cluster0.8h0tw.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo yeah");
});
mongoose.connection.on("error", (err) => {
  console.log("error", err);
});

app.get("/", (req, res) => {
  res.send("welcome to node js");
});

app.post("/send-data", (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    picture: req.body.picture,
    salary: req.body.salary,
    position: req.body.position,
  });
  employee
    .save()
    .then((data) => {
      console.log(data);
      res.send("success");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log("server running");
});
