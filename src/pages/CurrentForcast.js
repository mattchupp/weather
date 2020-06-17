import React, { useState, useEffect } from 'react';
import '../App.css';
import Temperature from '../components/Temperature.js';
import Summary from '../components/Summary.js';
import City from '../components/City.js';
import moment from 'moment'; 

import axios from 'axios';

/* 
  JSON returned with just current forcast

  {
    "latitude": 40.109623,
    "longitude": -88.275031,
    "timezone": "America/Chicago",
    "currently": {
        "time": 1591370141,
        "summary": "Humid and Mostly Cloudy",
        "icon": "partly-cloudy-day",
        "nearestStormDistance": 30,
        "nearestStormBearing": 261,
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 79.03,
        "apparentTemperature": 80.93,
        "dewPoint": 72.07,
        "humidity": 0.79,
        "pressure": 1012,
        "windSpeed": 7.12,
        "windGust": 9.29,
        "windBearing": 232,
        "cloudCover": 0.76,
        "uvIndex": 4,
        "visibility": 10,
        "ozone": 308.8
    },
    ...

    "daily": {
        "summary": "No precipitation throughout the week.",
        "icon": "clear-day",
      ...
    }
  }



*/

function CurrentForcast() {

  // store weather data from darksky
  const [currentWeather, setCurrentWeather] = useState([]); 

  // store hourly weather
  const [hourlyWeather, setHourlyWeather] = useState([]); 

  // stores the city from zipcode/geolocation
  const [currentCity, setCurrentCity] = useState(''); 

  // stores the state from zipcode/geolocation
  const [currentState, setCurrentState] = useState(''); 

  // set the zipcode that is put in the zipcode input
  const [zipcode, setZipcode] = useState('');

  // if data is loaded
  const [loaded, setLoaded] = useState(false); 

  // toggle hourly weather
  const [showHourly, setShowHourly] = useState(false); 

  // const [submitted, setSubmitted] = useState(false);
  // const [gotLocation, setGotLocation] = useState(false); 


  // ComponentDidMount and get lat/lng if location is allowed
  // pass lat/lng into the darksky api and fetch weather
  // If location isn't allowed, the user will submit zipcode and getWeather() is called
  // on submit
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      // setLat(position.coords.latitude);
      // setLong(position.coords.longitude);
      const lat = position.coords.latitude; 
      const lng = position.coords.longitude; 

      axios.get(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.REACT_APP_MAPQUEST_KEY}&location=${lng},${lat}`)
      .then(res => {
        console.log(res.data.results)
        let city = res.data.results.locations.adminArea5.toString();
        console.log(city) 
        // console.log('City :' + res.data.results)
        // console.log('State :' + res.data.locations.adminArea3)
        // setCurrentCity(res.data.results.locations.adminArea5)
        // setCurrentState(res.data.results.locations.adminArea3)
      })
      .catch(err => {
        console.log(err)
      })
      
      // get weather from darksky
      axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.REACT_APP_DARK_SKY_KEY}/${lat},${lng}`)
      .then(res => {
        setCurrentWeather(res.data.currently)
        // console.log(res.data.hourly)
        setHourlyWeather(res.data.hourly.data)
        
        setLoaded(true)
        console.log(res.data.currently)

      }).catch(err => {
        console.log(err)
      })
      
    }); 
  }, [])

  
  // this function runs when a zipcode is submitted
  // get the lat/lng from zipcode and pass those values in to the darksky api
  // if location isn't allowed on page load || getting a different location by zipcode this is called
  function getWeather() {
    axios.get(`https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/${process.env.REACT_APP_ZIPCODE_KEY}/info.json/${zipcode}/degrees`)
    .then(res => {

      // store response data to be used in return
      setCurrentCity(res.data.city); 
      setCurrentState(res.data.state); 

      // set variables and just pass it straight to the darksky api call
      const lat = res.data.lat; 
      const lng = res.data.lng;  

      // get weather from darksky
      axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.REACT_APP_DARK_SKY_KEY}/${lat},${lng}`)
      .then(res => {
        setCurrentWeather(res.data.currently)
        setHourlyWeather(res.data.hourly.data)
        setLoaded(true)
        console.log(res.data.currently)
      }).catch(err => {
        console.log(err)
      })

    }).catch(err => {
      console.log(err)
    })
  }

  // run on submit
  const handleSubmit = (event) => {
    console.log('Submitted: ' + zipcode); 
    // console.log(currentLocation);
    getWeather()
    event.preventDefault();
  }

  
  const forecast = {
    padding: '20px 10px',
    color: 'white',
    width: '100%',
    textAlign: 'center',
    margin: '0 auto'
  }

  const textInput = {
    backgroundColor: '#303030',
    color: 'white'
  }

  console.log(hourlyWeather)

  return (
    <div style={forecast}>

      <form className="uk-margin-small" onSubmit={handleSubmit}>
        <div className="uk-inline">
          <span className="uk-form-icon" uk-icon="icon: search"></span>
          <input style={textInput} className="uk-input uk-form-width-medium"
            type="text" placeholder="Zipcode" value={zipcode} onChange={event => setZipcode(event.target.value)} />
        </div>
      </form>

      {loaded && 
        <div className="uk-flex uk-flex-center">
          <div className="uk-card uk-card-secondary uk-card-small uk-card-body uk-width-1-2">
            {currentCity && <City city={currentCity} state={currentState} />}
            <Summary summary={currentWeather.summary} icon={currentWeather.icon} />
            <Temperature temp={Math.round(currentWeather.temperature)} />
          </div>
        </div>
      }

      <br />

      {loaded && 
        <button className="uk-button uk-button-primary" onClick={((e) => setShowHourly(!showHourly))}>Show Hourly</button>
      }

      <br />

      {showHourly &&
        <div className="uk-grid-small uk-grid-column-small" uk-grid="true">
          {hourlyWeather.map((hour) => (  
            <div key={hour.time} className="uk-card uk-card-secondary uk-card-small uk-card-body uk-width-1-4">
              <p>{moment.unix(hour.time).format('LLLL')}</p>
              <Summary summary={hour.summary} icon={hour.icon} />
              <Temperature temp={Math.round(hour.temperature)} />
            </div>    
          ))}
        </div>
      }
    </div>
  )

} 


export default CurrentForcast
