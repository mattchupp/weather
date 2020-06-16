import React from 'react'; 


function NavBar() {

  return (
    <nav className="uk-navbar-container" uk-navbar>
      <div className="uk-navbar-left">
        <ul className="uk-navbar-nav">
          <li className=""><a href="">Home</a></li>
          <li className=""><a href="">Current Weather</a></li>
        </ul>
      </div>
    </nav>
  )
}


export default NavBar