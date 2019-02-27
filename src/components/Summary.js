import React, { Component } from 'react';
import WeatherIcon from './WeatherIcon.js';

class Summary extends Component {

  render() {

    return (
      <div>
          <WeatherIcon icon={this.props.icon} />
          {this.props.summary}
      </div>
    )
  }

}


export default Summary
