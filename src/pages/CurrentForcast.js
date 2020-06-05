import React, { useState, useEffect } from 'react';
import '../App.css';
import Temperature from '../components/Temperature.js';
import Summary from '../components/Summary.js';
import City from '../components/City.js';

import axios from 'axios';

/* 
  JSON returned with just current forcast
  - [ ] store currently to state currently and map for the current weather

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
  // constructor() {
  //   super();
  //   this.state = {
  //     zipcode: "",
  //     location: {
  //       long: null,
  //       lat: null,
  //       city: "",
  //       state: ""
  //     },
  //     currentTemp: "",
  //     currentSummary: "",
  //     currentIcon: "",
  //     currentTime: "",
  //     hourlySummary: "",
  //     submitted: false,
  //     loaded: false
  //   };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);

  // }

  // Set state
  const [currentWeather, setCurrentWeather] = useState([]); 
  const [currentLocation, setCurrentLocation] = useState([]); 
  const [zipcode, setZipcode] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // componentDidMount(){
  //
  // }

  /* fetches weather data
    * first get request takes zip code to get lat & long
    * second get request gets the weather data
  */
  const getWeather = () => {

      // const darkSkyKey = process.env.DARK_SKY_KEY;

      axios.get(`https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/Vx2iDKzTlE0ApfqiPcQDVmdgU88QqB0eNkE1jyjlWOoS0MPWa7gUEsopeSY5WiwD/info.json/${zipcode}/degrees`)
      .then(res => {
        // let presentState = {...this.state};
        //   presentState.location.long = res.data.lng;
        //   presentState.location.lat = res.data.lat;
        //   presentState.location.city = res.data.city;
        //   presentState.location.state = res.data.state;
        //   this.setState({ ...presentState });
        setCurrentLocation(res.data); 
        console.log(res.data); 
        }).catch(err => {
          console.log(err);
        })
    // .then(() => {
    //   axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/895d852c061ef91db419f40459c25d83/${this.state.location.lat},${this.state.location.long}`)
    //   .then(res => {
    //     let presentState = {...this.state};
    //       presentState.currentTemp = res.data.currently.temperature;
    //       presentState.currentSummary = res.data.currently.summary;
    //       presentState.currentIcon = res.data.currently.icon;
    //       presentState.currentTime = res.data.currently.time;
    //       presentState.hourlySummary = res.data.hourly.summary;
    //       this.setState({ ...presentState });
    //       this.setState({ loaded: true});
    //     }).catch(err => {
    //       console.log(err);
    //     })
    // })
  }

  useEffect(() => {
    if(submitted) {
      axios.get(`https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/Vx2iDKzTlE0ApfqiPcQDVmdgU88QqB0eNkE1jyjlWOoS0MPWa7gUEsopeSY5WiwD/info.json/${zipcode}/degrees`)
      .then(res => {
        setCurrentLocation(res.data); 
        console.log(res.data); 
      }).catch(err => {
        console.log(err);
      })
    }
  }, [zipcode, submitted])

  
  const handleSubmit = (event) => {
    // this.getWeather();
    // this.setState({submitted: true});
    // this.setState({loaded: false});
    console.log('Submitted: ' + zipcode); 
    console.log(currentLocation);
    setSubmitted(true); 
    event.preventDefault();
  }

  // render() {
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

      {/* <div className="uk-flex uk-flex-center">
        <div className="loader">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <div className="circle3"></div>
          <div className="circle4"></div>
        </div>
      </div> */}

    </div>
  )

} 
/*
    // If submitted but not yet loaded show the loading animation

    if (this.state.submitted && !this.state.loaded) {
      return (
        <div style={forecast}>

          <form className="uk-margin-small" onSubmit={this.handleSubmit}>
            <div className="uk-inline">
              <span className="uk-form-icon" uk-icon="icon: search"></span>
              <input style={textInput} className="uk-input uk-form-width-medium"
                type="text" placeholder="Zipcode" value={this.state.address} onChange={this.handleChange} />
            </div>
          </form>

          <div className="uk-flex uk-flex-center">
            <div className="loader">
              <div className="circle1"></div>
              <div className="circle2"></div>
              <div className="circle3"></div>
              <div className="circle4"></div>
            </div>
          </div>

        </div>
      )
    }

    // make sure zip code is submitted and data is loaded before showing weather
    //if (this.state.submitted && this.state.loaded) {
    if (this.state.submitted && this.state.loaded) {
      return (
        <div style={forecast}>

          <form className="uk-margin-small" onSubmit={this.handleSubmit}>
            <div className="uk-inline">
              <span className="uk-form-icon" uk-icon="icon: search"></span>
              <input style={textInput} className="uk-input uk-form-width-medium"
                type="text" placeholder="Zipcode" value={this.state.address} onChange={this.handleChange} />
            </div>
          </form>

          <div className="uk-flex uk-flex-center">
            <div className="uk-card uk-card-secondary uk-card-small uk-card-body uk-width-1-2">
              <City city={this.state.location.city} state={this.state.location.state} />
              <Summary summary={this.state.currentSummary} icon={this.state.currentIcon} />
              <Temperature temp={Math.round(this.state.currentTemp)} />
              <p>{this.state.hourlySummary}</p>
            </div>
          </div>

        </div>
      )
    } else {
      return (
        <div style={forecast}>

          <form className="uk-margin-small" onSubmit={this.handleSubmit}>
            <div className="uk-inline">
              <span className="uk-form-icon" uk-icon="icon: search"></span>
              <input style={textInput} className="uk-input uk-form-width-medium"
                type="text" placeholder="Zipcode" value={this.state.address} onChange={this.handleChange} />
            </div>
          </form>

        </div>
      )
    // }
  }

}

*/

export default CurrentForcast






/*
Code that has been removed in my refactoring

getWeather = () => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/Vx2iDKzTlE0ApfqiPcQDVmdgU88QqB0eNkE1jyjlWOoS0MPWa7gUEsopeSY5WiwD/info.json/${this.state.zipcode}/degrees`)
    .then(res => {
      let presentState = {...this.state};
        presentState.location.long = res.data.lng;
        presentState.location.lat = res.data.lat;
        presentState.location.city = res.data.city;
        presentState.location.state = res.data.state;
        this.setState({ ...presentState });
      }).catch(err => {
        console.log(err);
      })
  .then(() => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/895d852c061ef91db419f40459c25d83/${this.state.location.lat},${this.state.location.long}`)
    .then(res => {
      let presentState = {...this.state};
        presentState.currentTemp = res.data.currently.temperature;
        presentState.currentSummary = res.data.currently.summary;
        presentState.currentIcon = res.data.currently.icon;
        presentState.currentTime = res.data.currently.time;
        presentState.hourlySummary = res.data.hourly.summary;
        this.setState({ ...presentState });
        this.setState({ loaded: true});
      }).catch(err => {
        console.log(err);
      })
  })
}







componentDidMount() {
  navigator.geolocation.getCurrentPosition(function(position) {
    this.setState({location: {autoLat: position.coords.latitude} });
    this.setState({location: {autoLong: position.coords.longitude} });
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);

  });

}








*/
