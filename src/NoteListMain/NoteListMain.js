import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './NoteListMain.css'

import NotefulContext from '../NotefulContext'


export default class NoteListMain extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = NotefulContext;

  render() {

    return (
      <section className='NoteListMain'>
        
      </section>
    )
  }

}


NoteListMain.propType = {
  match: PropTypes.object.isRequired
};