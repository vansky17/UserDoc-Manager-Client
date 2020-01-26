import React from 'react'
import PropTypes from 'prop-types';

import './NotePageMain.css'

import NotefulContext from '../NotefulContext'
import Note from '../Note/Note'
import { findNote } from '../notes-helpers'

export default class NotePageMain extends React.Component {
  state = {
    forErrors: this.props.match,
    toggle: true
  }

  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = NotefulContext;
  handleDeleteNote = noteId => {
    this.props.history.push('/')
  }
    

  render () {
    const { notes=[] } = this.context
    const { noteId } = this.state.forErrors.params
    const note = findNote(notes, noteId) || { content: ''}
      if(this.state.toggle === false) {
        this.setState({
          forErrors: 'err'
        })
        this.setState({
          forErrors: this.props.match
        })
      }

    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )    
  }

}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}

NotePageMain.propType = {
  forErrors: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    params: PropTypes.array.isRequired
};  