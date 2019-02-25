import React, { Component } from 'react';
import './App.css';
import Weather from './Weather.js';
import GeoCoding from './GeoCoding.js';



class App extends Component {
  render() {
    return (
      <div>
        <Weather />
        <GeoCoding />
      </div>
    );
  }
}

export default App;
