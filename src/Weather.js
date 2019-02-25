import React, { Component } from 'react';
import Temperature from './components/Temperature.js'
import Summary from './components/Summary.js'

import axios from 'axios';

class Weather extends Component {
  constructor() {
    super();
    this.state = {
      temp: "",
      summary: ""
    };
  }

  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/895d852c061ef91db419f40459c25d83/40.116330,-88.243520`)
    .then(res => {
      let presentState = {...this.state};
        presentState.temp = res.data.currently.temperature;
        presentState.summary = res.data.currently.summary;
        this.setState({ ...presentState });
      }).catch(err => {
        console.log(err);
      })
  }


  render() {
    return (
      <div>
        <Summary summary={this.state.summary} />
        <Temperature temp={Math.round(this.state.temp)} />
      </div>
    )
  }

}


export default Weather
