const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");
const dotenv = require('dotenv')
dotenv.config()

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.static("dist"));

app.get("/", function (req, res) {
  //res.sendFile('dist/index.html')
  res.sendFile(path.resolve("src/client/views/index.html"));
});

const WEATHER_BIT_URL = `https://api.weatherbit.io/v2.0/forecast/daily?`;
const PIXABAY_URL = `https://pixabay.com/api/?`;
const GEO_NAMES_URL = `http://api.geonames.org/searchJSON?`;

const WEATHER_BIT_API_KEY =process.env.WEATHER_BIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
const GEO_NAMES_API_USER = process.env.GEO_NAMES_API_USER;

// functions to get json data
const getGeonamesData = async (url) => {
  try {
    const res = await fetch(url);
    return await res.json();
  } 
  catch (error) {
    console.log("error", error);
  }
};

const getWeatherData = async (url) => {
  try {
    const res = await fetch(url);
    return await res.json();
  } 
  catch (error) {
    console.log("error", error);
  }
};

const getPixabayData = async (url) => {
  try {
    const res = await fetch(url);
    return await res.json();
  } 
  catch (error) {
    console.log("error", error);
  }
};


app.post("/all", async (req, res) => {

  let city = req.body.city;
  const trip = {};

  //get longitude and latitude 
  getGeonamesData(`${GEO_NAMES_URL}q=${city}&username=${GEO_NAMES_API_USER}`).then(data => {
    trip.lng = data.geonames[0].lng
    trip.lat = data.geonames[0].lat
    trip.name = data.geonames[0].name
    trip.countryName = data.geonames[0].countryName
    //get weather 
    getWeatherData(`${WEATHER_BIT_URL}lat=${trip.lat}&lon=${trip.lng}&key=${WEATHER_BIT_API_KEY}`).then(data => {
      trip.temperature = data.data[0].temp;
      trip.weatherForecast = data.data[0].weather.description;
      trip.timezone = data.timezone;
      //get img for target country 
      getPixabayData(`${PIXABAY_URL}key=${PIXABAY_API_KEY}&q=${city}&image_type=photo`).then(data => {
        trip.image = data.hits[0].largeImageURL;
        res.send(trip)
      })
    })
  })
});

app.listen(8081, (error) => {
  if (error) throw new Error(error);
  console.log("Server listening on port 8081!");
});


module.exports = app; // for server test