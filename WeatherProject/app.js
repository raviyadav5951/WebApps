const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const apiKey = "myapikey";
  const queryCity = req.body.cityName;
  const units = "metric";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    queryCity +
    "&appid=" +
    apiKey +
    "&units=" +
    units;

  https.get(url, function (response) {
    // console.log(response);
    response.on("data", function (data) {
      var weatherData = JSON.parse(data);
      const weatherTem = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const imageCloud = weatherData.weather[0].icon;
      const imageUrl =
        "http://openweathermap.org/img/wn/" + imageCloud + "@2x.png";

      res.write("<p>Weather in "+queryCity+" is " + description + "</p>");
      res.write(
        "<h1>The weather temperature in "+queryCity+" is " + weatherTem + " degree celsius</h1>"
      );
      res.write("<img src=" + imageUrl + ">");
      res.send();
    });
  });

});

app.listen(3000, function () {
  console.log("Listen on port 3000");
});
