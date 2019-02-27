import React, { Component } from 'react';
import './App.css';
import Temperature from './components/Temperature.js';
import Summary from './components/Summary.js';
import City from './components/City.js';

import axios from 'axios';

class Weather extends Component {
  constructor() {
    super();
    this.state = {
      zipcode: "",
      location: {
        long: null,
        lat: null,
        city: "Champaign",
        state: "IL"
      },
      temp: "20",
      summary: "clear",
      icon: "wind",
      submitted: false,
      loaded: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  /* fetches weather data
    * first get request takes zip code to get lat & long
    * second get request gets the weather data
  */
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
          presentState.temp = res.data.currently.temperature;
          presentState.summary = res.data.currently.summary;
          presentState.icon = res.data.currently.icon;
          this.setState({ ...presentState });
          this.setState({ loaded: true});
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
    this.setState({submitted: true});
    this.setState({loaded: false});
    event.preventDefault();
  }

  render() {
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

    /* make sure zip code is submitted and data is loaded before showing weather*/
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
              <Summary summary={this.state.summary} icon={this.state.icon} />
              <Temperature temp={Math.round(this.state.temp)} />
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
    }
  }

}


export default Weather
