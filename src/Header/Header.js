import React from 'react'
import './App.css'

class Header extends React.Component {
  render () {
    return (
      <>
      <header id="home" role="banner">
        <h1 className="slideDown">Hero</h1>
        <h3 className="slideDown">Describes basic functionality of the app</h3>
      </header>
    </>
    )
  }
}

export default Header