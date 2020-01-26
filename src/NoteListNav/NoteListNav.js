import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'

import './NoteListNav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import NotefulContext from '../NotefulContext'
import CircleButton from '../CircleButton/CircleButton'

export default class NoteListNav extends Component {
  static contextType = NotefulContext;
  render() {

    return (
      <div className='NoteListNav'>
        <div className='NoteListNav__button-wrapper'>
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
        </div>
      </div>
    )
  }
}
