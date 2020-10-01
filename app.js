const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apiKey = "506211aa14e7364cde164e263197165e";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=" + apiKey + "&units=metric";

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>Weather description is " + weatherDescription + "</p>");
      res.write("<h1>Temperature in " + query + " is " + temp + " degrees.</h1>");
      res.write("<img src=" + iconUrl + ">");
      res.send()
    });
  });
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
})
