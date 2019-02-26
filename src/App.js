import React, { Component } from 'react';
import './App.css';
import Weather from './Weather.js';
// import Search from './Search.js';



class App extends Component {
  render() {
    return (
      <div className="container">
        <Weather />
      </div>
    );
  }
}

export default App;
