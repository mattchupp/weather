import React, { useState, useEffect } from 'react';
import '../App.css';
import Temperature from '../components/Temperature.js';
import Summary from '../components/Summary.js';
import City from '../components/City.js';

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

  // Set state
  const [currentWeather, setCurrentWeather] = useState([]); 
  const [currentLocation, setCurrentLocation] = useState([]); 
  const [zipcode, setZipcode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loaded, setLoaded] = useState(false); 



  useEffect(() => {
    if(submitted) {
      axios.get(`https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/Vx2iDKzTlE0ApfqiPcQDVmdgU88QqB0eNkE1jyjlWOoS0MPWa7gUEsopeSY5WiwD/info.json/${zipcode}/degrees`)
      .then(res => {

        // store response data to be used in return
        setCurrentLocation(res.data); 

        // set variables and just pass it straight to the darksky api call
        const lat = res.data.lat; 
        const lng = res.data.lng; 
        console.log(res.data); 

        axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/895d852c061ef91db419f40459c25d83/${lat},${lng}`)
        .then(res => {
          console.log(res.data)
          console.log(res.data.currently)
          setCurrentWeather(res.data.currently)
          setLoaded(true)
          }).catch(err => {
            console.log(err)
          })
      }).catch(err => {
        console.log(err)
      })
    }
  }, [zipcode, submitted, loaded])

  // run on submit
  const handleSubmit = (event) => {
    // this.getWeather();
    // this.setState({submitted: true});
    // this.setState({loaded: false});
    console.log('Submitted: ' + zipcode); 
    console.log(currentLocation);
    setSubmitted(true); 
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
            <City city={currentLocation.city} state={currentLocation.state} />
            <Summary summary={currentWeather.summary} icon={currentWeather.icon} />
            <Temperature temp={Math.round(currentWeather.temperature)} />
            <p>{currentWeather.summary}</p>
          </div>
        </div>
      }
    
    </div>
  )

} 


export default CurrentForcast
