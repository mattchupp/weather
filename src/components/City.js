import React, { Component } from 'react';

class City extends Component {

  render() {
    return (
      <div className="uk-card-title">
        <h2>{this.props.city}, {this.props.state}</h2>
      </div>
    )
  }

}


export default City
