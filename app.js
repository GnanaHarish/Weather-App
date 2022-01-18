const express = require("express");

const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res){
  // console.log("Hi Harish !");
  res.sendFile(__dirname+"/index.html");
});


app.post("/", function(req, res){

  const location = req.body.locationName;
  
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&units="+units+"&appid="+apiKey;

  https.get(url, function(response){
    console.log(response);
    response.on("data", function(data){
      const weatherObject = JSON.parse(data);
      const weatherDecp = weatherObject.weather[0].description;
      const temprature = weatherObject.main.temp;
      const img = weatherObject.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+ img+"@2x.png";
      res.set('Content-Type', 'text/html');
      const desc = "<h3> The Descp is it is"+weatherDecp+"</h3>";
      res.write('<img src="'+imageURL +'">');
      res.write("The Temprature In "+location+" is "+temprature+" and it is "+weatherDecp);
      res.send();
    });
  });
})



app.listen(3000, function(){
  console.log("The Server is running on port 3000");
});
