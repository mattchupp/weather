import React, { Component } from 'react';

class City extends Component {

  render() {
    return (
      <div>
        <p>{this.props.city}, {this.props.state}</p>
      </div>
    )
  }

}


export default City
