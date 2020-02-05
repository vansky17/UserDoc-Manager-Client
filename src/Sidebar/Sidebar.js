import React from "react";
/* import { Route, Link } from "react-router-dom"; */
import UserDocsContext from "../UserDocsContext";
import CircleButton from '../CircleButton/CircleButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faFileUpload, faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import { HashLink as Link  } from 'react-router-hash-link';
import "../App/App.css";
/* import Config from '../config' */
/* const API = Config.API_ENDPOINT; */

class Sidebar extends React.Component {

  static contextType = UserDocsContext;

  state = {
     visible: false
  }
  toggleMobileMenu = () => {
    
    this.setState({ visible: ! this.state.visible });
    console.log(this.state.visible);
  }
  
  render () {
    /* const { products=[] } = this.context */
    const mobileStyle = this.state.visible? "block" : "none"
 
    return(
      <nav role="navigation">
        <div className="hamburger-menu" >
          <input type="checkbox" onClick={this.toggleMobileMenu} id="hamburger"/>
          <label htmlFor="hamburger" className="hamburger">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </label>
        </div>
        <div className="menu">
          <div>
            <ul>
              <li>
                <CircleButton   
                    tag={Link}
                    to='/#home'
                    type='button'
                    className=''
                  >
                  <FontAwesomeIcon icon={faHome} />
                  <br />
                    HOME
                </CircleButton>
                </li>
                {/* products.map(product =>
                <li key={product.id}>
                <CircleButton
                  tag={Link}
                  className=''
                  to={`/#${product.id}`}
                  type='button'
                >
                  {product.name}
                </CircleButton>
                </li>
              )*/}
                <li>
                  <CircleButton
                    tag={Link}
                    className=''
                  to={'/#1'}
                  type='button'
                >
                  Product 1
                </CircleButton>
                </li>
              <li>
                <CircleButton
                  tag={Link}
                  className=''
                  to={'/#2'}
                  type='button'
                >
                  Product 2
                </CircleButton>
                </li>
              <li>
                <CircleButton
                  tag={Link}
                  className=''
                  to={'/#3'}
                  type='button'
                >
                  Product 3
                </CircleButton>
                </li>
              <hr></hr>
              <li>
            <CircleButton   
                tag={Link}
                to='/upload-file#add-doc'
                type='button'
                className=''
              >
                <FontAwesomeIcon icon={faFileUpload} />
                <br />
                UPLOAD DOC
              </CircleButton>
            <CircleButton   
                tag={Link}
                to='/add-product#add-pg'
                type='button'
                className=''
              >
                <FontAwesomeIcon icon={faProjectDiagram} />
                <br />
                MANAGE PRODUCTS
              </CircleButton>
            </li>
            </ul>
          </div>
        </div>

        <div className="divider-menu"></div>
        
          <div className="mobile-menu slideDown" style={{display: `${mobileStyle}`}} >        
          <ul> 
            <li>
              <CircleButton   
                tag={Link}
                to='/#home'
                type='button'
                className=''
                onClick={this.toggleMobileMenu}
              >
                  <FontAwesomeIcon icon={faHome} />
                  <br />
                    HOME
               </CircleButton>
            </li>
            <li>
                  <CircleButton
                    tag={Link}
                    className=''
                  to={'/#1'}
                  type='button'
                  onClick={this.toggleMobileMenu}
                >
                  Product 1
                </CircleButton>
                </li>
              <li>
                <CircleButton
                  tag={Link}
                  className=''
                  to={'/#2'}
                  type='button'
                  onClick={this.toggleMobileMenu}
                >
                  Product 2
                </CircleButton>
                </li>
              <li>
                <CircleButton
                  tag={Link}
                  className=''
                  to={'/#3'}
                  type='button'
                  onClick={this.toggleMobileMenu}
                >
                  Product 3
                </CircleButton>
                </li>
            <hr></hr>
            <li>
            <CircleButton   
                tag={Link}
                to='/upload-file#add-doc'
                type='button'
                className=''
                onClick={this.toggleMobileMenu}
              >
                <FontAwesomeIcon icon={faFileUpload} />
                <br />
                UPLOAD DOC
              </CircleButton>
            <CircleButton   
                tag={Link}
                to='/add-product#add-pg'
                type='button'
                className=''
                onClick={this.toggleMobileMenu}
              >
                <FontAwesomeIcon icon={faProjectDiagram} />
                <br />
                MANAGE PRODUCTS
              </CircleButton>
            </li>
          </ul> 
        </div> 
        
        
      </nav>
    )
  }
}
export default Sidebar