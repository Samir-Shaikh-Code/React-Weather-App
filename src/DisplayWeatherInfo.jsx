import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./DisplayWeatherInfo.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import SunnyIcon from "@mui/icons-material/Sunny";

function DisplayWeatherInfo() {
  const [city, setCity] = useState({
    city: "Mumbai",
    temp: 26.1,
    humidity: 57,
    feels_Like: 26.1,
    description: "clear sky",
  });
  const [newCity, setNewCity] = useState("");
  const [error, setError] = useState("");



  const getWeatherData = async (event) => {
    event.preventDefault();

    if(!newCity.trim()) return;
    setError("");

    const apiKey = "YOUR_API_KEY";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);

    // console.log(response);

    if (!response.ok) {
      throw new Error("No such place found");
    }

    const data = await response.json();
    // console.log(data)

    const weatherData = {
      city: data.name,
      temp: data.main.temp,
      humidity: data.main.humidity,
      feels_Like: data.main.feels_like,
      description: data.weather[0].description,
    };

    setCity(weatherData);
    // console.log(newCity);
    // console.log(weatherData);

    setNewCity("");
    } catch (err) {
        setError(err.message)
        setNewCity("")
    }
  };

  const handleChange = (event) => {
    setNewCity(event.target.value);
  };

  return (
    <>
      <div className="DisplayWeatherInfo">
        <h1>Search for weather</h1>
        <form>
          <TextField
            id="cityInput"
            label="City Name"
            variant="outlined"
            value={newCity}
            onChange={handleChange}
          />
          <br />
          <Button
            type="submit"
            variant="contained"
            id="searchButton"
            onClick={getWeatherData}
          >
            Search
          </Button>

          {error && (<p className="errorMessage">{error}</p>)}
          <br />

          <Card sx={{ maxWidth: 345, borderRadius: 7 }} id="weatherInfoCard">
            <CardMedia
              sx={{ height: 140 }}
              image="https://www.weathercompany.com/wp-content/uploads/2024/01/AdobeStock_359999296-sized.jpg"
              title="green iguana"
            />
            <CardContent>

              <Typography gutterBottom variant="h5" component="div">
                {city.city}
              {city.humidity > 80 ? (
                <ThunderstormIcon style={{ marginLeft: "8px" }} />
              ) : city.temp > 25 ? (
                <SunnyIcon style={{ marginLeft: "8px" }} />
              ) : (
                <AcUnitIcon style={{ marginLeft: "8px" }} />
              )}
              </Typography>

              <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
              component={"span"}
            >
                <p>Temp : {city.temp}&deg;C</p>
                <p>Humidity : {city.humidity}</p>
                <p>Feels_Like : {city.feels_Like}&deg;C</p>
                <p>Description : {city.description}</p>
            </Typography>

            </CardContent>
          </Card>
        </form>
      </div>
    </>
  );
}

export default DisplayWeatherInfo;
