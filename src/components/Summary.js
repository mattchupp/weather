import React, { Component } from 'react';
import WeatherIcon from './WeatherIcon.js';

class Summary extends Component {

  render() {

    return (
      <div>
          <WeatherIcon icon={this.props.icon} />
          <p className="uk-text-lead" >{this.props.summary}</p>
      </div>
    )
  }

}


export default Summary
