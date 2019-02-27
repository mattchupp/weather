import React, { Component } from 'react';
import Temperature from './components/Temperature.js'
import Summary from './components/Summary.js'

import axios from 'axios';

class Weather extends Component {
  constructor() {
    super();
    this.state = {
      zipcode: "61821",
      location: {
        long: null,
        lat: null,
        city: null,
        state: null
      },
      temp: "",
      summary: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  getWeather = () => {
      axios.get(`https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/JZtnzsSPUV18mGJRsWf5nVG9vngAc8c12VXdaRfqv2xp77q4mSPy6yZWctEDAVAc/info.json/${this.state.zipcode}/degrees`)
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
          presentState.temp = res.data.currently.temperature;
          presentState.summary = res.data.currently.summary;
          this.setState({ ...presentState });
        }).catch(err => {
          console.log(err);
        })
    })
  }

  /* Form Handlers */
  handleChange(event) {
    this.setState({zipcode: event.target.value});
  }

  handleSubmit(event) {
    this.getWeather();
    event.preventDefault();
  }

/*
  componentDidMount() {
      axios.get(`https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/JZtnzsSPUV18mGJRsWf5nVG9vngAc8c12VXdaRfqv2xp77q4mSPy6yZWctEDAVAc/info.json/${this.state.location.zipcode}/degrees`)
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
          presentState.temp = res.data.currently.temperature;
          presentState.summary = res.data.currently.summary;
          this.setState({ ...presentState });
        }).catch(err => {
          console.log(err);
        })
    })
  }
  */


  render() {
    const forecast = {
      backgroundColor: '#2f57ff',
      padding: '20px 10px',
      color: 'white',
      width: '100%',
      textAlign: 'center',
      margin: '0 auto'
    }

    console.log(this.state.location.zipcode);

    return (
      <div style={forecast}>

        <form onSubmit={this.handleSubmit}>
          <label>
            Zipcode:
            <input type="text" value={this.state.address} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <Summary summary={this.state.summary} />
        <Temperature temp={Math.round(this.state.temp)} />
        <p>City: {this.state.location.city}, {this.state.location.state}</p>
      </div>
    )
  }

}


export default Weather
