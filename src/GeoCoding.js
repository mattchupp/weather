import React, { Component } from 'react';

import axios from 'axios';

class GeoCoding extends Component {
  constructor() {
    super();
    this.state = {
      long: null,
      lat: null,
      city: null,
    };
  }

  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/JZtnzsSPUV18mGJRsWf5nVG9vngAc8c12VXdaRfqv2xp77q4mSPy6yZWctEDAVAc/info.json/61821/degrees`)
    .then(res => {
      let presentState = {...this.state};
        presentState.long = res.data.lng;
        presentState.lat = res.data.lat;
        presentState.city = res.data.city;
        this.setState({ ...presentState });
      }).catch(err => {
        console.log(err);
      })
  }


  render() {

    // const gc = this.state.geocode.Data;

    return (
      <div>
        <p>Lat:{this.state.lat}</p>
        <p>Lng:{this.state.long}</p>
        <p>City:{this.state.city}</p>
      </div>
    )
  }

}


export default GeoCoding
