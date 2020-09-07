const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  // console.log(__dirname)
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  // console.log(__dirname)
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);

  res.send("Sum=" + (num1 + num2));
});


app.get("/bmicalculator", function (req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function (req, res) {
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);
  var bmi = weight / (height * height);
  res.send("Your BMI is" + bmi);
});

app.listen(3000, function (req, res) {
  console.log("listenning on port 3000");
});
 