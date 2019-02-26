import React, { Component } from 'react';
import Temperature from './components/Temperature.js'
import Summary from './components/Summary.js'

import axios from 'axios';

class Weather extends Component {
  constructor() {
    super();
    this.state = {
      temp: "",
      summary: "",
      long: null,
      lat: null,
      city: null,
      state: null,
    };
  }

  componentDidMount() {
      axios.get(`https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/JZtnzsSPUV18mGJRsWf5nVG9vngAc8c12VXdaRfqv2xp77q4mSPy6yZWctEDAVAc/info.json/61821/degrees`)
      .then(res => {
        let presentState = {...this.state};
          presentState.long = res.data.lng;
          presentState.lat = res.data.lat;
          presentState.city = res.data.city;
          presentState.state = res.data.state;
          this.setState({ ...presentState });
        }).catch(err => {
          console.log(err);
        })
    .then(() => {
      axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/895d852c061ef91db419f40459c25d83/40.116330,-88.243520`)
      .then(res => {
        let presentState = {...this.state};
          presentState.temp = res.data.currently.temperature;
          presentState.summary = res.data.currently.summary;
          this.setState({ ...presentState });
        }).catch(err => {
          console.log(err);
        })
    })
  }


  render() {
    const forecast = {
      backgroundColor: '#2f57ff',
      padding: '20px 10px',
      color: 'white',
      width: '100%',
      textAlign: 'center',
      margin: '0 auto'
    }


    return (
      <div style={forecast}>
        <Summary summary={this.state.summary} />
        <Temperature temp={Math.round(this.state.temp)} />
        <p>Lat: {this.state.lat}</p>
        <p>Lng: {this.state.long}</p>
        <p>City: {this.state.city}, {this.state.state}</p>
      </div>
    )
  }

}


export default Weather
