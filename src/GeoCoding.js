import React, { Component } from 'react';

import axios from 'axios';

class GeoCoding extends Component {
  constructor() {
    super();
    this.state = {
      geocode: [],
      long: "",
      lat: ""
    };
  }

  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?address=Champaign+IL,+CA&key=AIzaSyDA59Hgfn2YG50uqDJZXAZEm2Q8w4fzZrE`)
    .then(res => {
      this.setState({ geocode: res.data });
      console.log(res.data);
    })
  }


  render() {

    // const gc = this.state.geocode.Data;

    return (
      <div>

      </div>
    )
  }

}


export default GeoCoding
