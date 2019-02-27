import React, { Component } from 'react';

class Temperature extends Component {

  render() {
    return (
      <div>
        <p className="uk-text-lead">{this.props.temp}&deg;F</p>
      </div>
    )
  }

}


export default Temperature
