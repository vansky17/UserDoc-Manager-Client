import React from 'react';
import './Header.css';

class Header extends React.Component {
  render () {
    return (    
      <header id="home" role="banner" className="video-container">
          <h1 >UserDocs Manager</h1>
          <h2 >Overview Of Technical Documents</h2>
          <h3 >Your Department</h3>
      </header>
    );
  }
}

export default Header