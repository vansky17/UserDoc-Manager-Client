import React from 'react';
import './Header.css';
import video from '../video.mov';

class Header extends React.Component {
  render () {
    return (
      <header id="home" role="banner" className="video-container">
        <video
          id="videoBG"
          src={video}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="video-content">
          <h1 >UserDocs Manager</h1>
          <h2 >Overview Of Technical Documents</h2>
          <h3 >Your Department</h3>
        </div>
      </header>
    );
  }
}

export default Header
