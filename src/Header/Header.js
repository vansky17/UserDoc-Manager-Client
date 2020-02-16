import React from 'react'
import './Header.css'
import video from '../video.mov'

class Header extends React.Component {
  render () {
    return (
      
      <header id="home" role="banner" className="video-container">
        <video id="videoBG" src={video}  autoPlay muted loop/>
          <div className="video-content">
          <h1 >UserDocs Manager</h1>
          <h3 >Overview Of Technical Documents</h3>
          <h4 >Your Department</h4>
        </div>
      </header>
      
   
    )
  }
}

export default Header