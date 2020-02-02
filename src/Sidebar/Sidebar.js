import React from "react";
/* import { Route, Link } from "react-router-dom"; */
import UserDocsContext from "../UserDocsContext";
import CircleButton from '../CircleButton/CircleButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faFileUpload, faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import { HashLink as Link  } from 'react-router-hash-link';
import "./App.css";
import Config from '../config'
const API = Config.API_ENDPOINT;

class Sidebar extends React.Component {
  static contextType = UserDocsContext;
  render () {
    const { products=[] } = this.context
    return(
      <>
        <nav role="navigation">
        <div className="hamburger-menu">
      <input type="checkbox" id="hamburger"/>
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
                className='NoteListNav__add-folder-button'
              >
                <FontAwesomeIcon icon={faHome} />
                <br />
                  HOME
              </CircleButton>
            </li>
            {products.map(product =>
            <li key={product.id}>
            <CircleButton
              tag={Link}
              className='NoteListNav__folder-link'
              to={`/#${product.id}`}
              type='button'
            >
              {product.name}
            </CircleButton>
            </li>
          )}
          <hr></hr>
          <li>
        <CircleButton   
            tag={Link}
            to='/upload-file'
            type='button'
            /* className='NoteListNav__add-folder-button' */
          >
            <FontAwesomeIcon icon={faFileUpload} />
            <br />
            UPLOAD DOC
          </CircleButton>
        <CircleButton   
            tag={Link}
            to='/add-product'
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
    <div className="mobile-menu slideDown">
      <ul>
        {/* For the static version: 
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#p1">Product 1</a>
        </li>
        <li>
          <a href="#p2">Product 2</a>
        </li>
        <li>
          <a href="#p3">Product 3</a>
        </li>
        <hr></hr>
        <li>
        <CircleButton   
            tag={Link}
            to='/upload-file'
            type='button'
            className='NoteListNav__add-folder-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            UPLOAD
          </CircleButton>
        </li>
        <li>
          <a href="productgroups.html">Add Product Group</a>
        </li> */}
      </ul>
    </div>
        </nav>
      </>
    )
  }
}
export default Sidebar