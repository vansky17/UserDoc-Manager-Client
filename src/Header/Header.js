import React from 'react'
import './Header.css'

class Header extends React.Component {
  render () {
    return (
      <>
      <header id="home" role="banner">
        <h1 className="slideDown">UserDocs Manager</h1>
				<h3 >Overview Of Technical Documents</h3>
        <h4 >Your Department</h4>
      </header>
    </>
    )
  }
}

export default Header