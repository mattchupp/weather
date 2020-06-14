import React, { Component } from 'react';
import './App.css';
// import Weather from './Weather.js';
import CurrentForcast from './pages/CurrentForcast';
import NavBar from './components/NavBar'; 


class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <div className="container">
          
          <CurrentForcast />
          {/* <Weather /> */}
        </div>
      </>
    );
  }
}

export default App;
