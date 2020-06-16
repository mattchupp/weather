import React, { Component } from 'react';
import './App.css';
// import Weather from './Weather.js';
import CurrentForcast from './pages/CurrentForcast';


class App extends Component {
  render() {
    return (
      <>
        <div className="container">
          
          <CurrentForcast />
          {/* <Weather /> */}
        </div>
      </>
    );
  }
}

export default App;
