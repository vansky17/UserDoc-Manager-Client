import React from 'react';
import UserDocsContext from './UserDocsContext';
import config from './config';
import PropTypes from 'prop-types';
import './App/App.css'
import './Upload.css'
/* This is not working yet */
export default class AddProductGroup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hasErrors: false,
        title: "",
        formValid: false,
        titleValid: false,
        validationMessage: "",
      };
    }

    static contextType = UserDocsContext;

    goBack = () => {
      this.props.history.goBack();
    }

    updateFormEntry(e) {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({
        [e.target.name]: e.target.value
      }, () => {
        this.validateEntry(name, value)
      });
    }

    validateEntry(name, value) {
      let inputErrors;
      let hasErrors = this.state.hasErrors;

      value = value.trim();
      if (value < 1) {
        inputErrors = `${name} is required.`;
      } else {
        inputErrors = '';
        hasErrors = false;
      }
      this.setState({
        validationMessage: inputErrors,
        [`${name}Valid`]: !hasErrors,
        hasErrors: !hasErrors
      }, this.formValid);
    }

    formValid() {
      const {
        titleValid
      } = this.state;
      if (titleValid === true) {
        this.setState({
          formValid: true
        });
      } else {
        this.setState({
          formValid: !this.formValid
        })
      }
    }

    handleSubmit(e) {
      e.preventDefault();
      const {
        title
      } = this.state;
      const product = {
        name: title
      }

      this.setState({
        error: null
      })
      fetch(`${config.API_ENDPOINT}/products`, {
          method: 'POST',
          body: JSON.stringify(product),
          headers: {
            'content-type': 'application/json'
          }
        })
        .then(res => {
          if (!res.ok) {
            return res.json().then(error => {
              console.log(`Error is: ${error}`)
              throw error
            })
          }
          return res.json()
        })
        .then(data => {
          this.goBack()
          this.context.addFolder(data)
        })
        .catch(error => {
          this.setState({
            error
          })
        })
    }

    render() {
      const { history } = this.props;
      return (
           /*  <form 
                className=""
                onSubmit={e => this.handleSubmit(e)}>
                <h2 className="title">Add Folder</h2>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input 
                    type="text" 
                    className="field"
                    name="title" 
                    id="title" 
                    aria-label="Title"
                    aria-required="true"
                    placeholder="Folder Title"
                    aria-placeholder="Folder Title"
                    onChange={e => this.updateFormEntry(e)}/>
                </div> </form>
                */
          <div className="upload" id="add-pg">
            <a href="/#" className="close" onClick={() => {
              history.push("/"); 
              }}>
            </a>
            <header>
              <h3>Manage product groups</h3>
            </header>
            <form className='product-group-form'>
          <div>
            <label htmlFor="pg-name">Create new product group</label>
            <input placeholder='New Product Name' type="text" name='pg-name' id='pg-name' />
          </div>
          <button type='submit'>Create</button>
          <div>
            <label htmlFor="rename">Rename product group</label>
            <select name='rename' id='rename' >
              <option>Product 1</option>
              <option>Product 2</option>
              <option>Product 3</option>
            </select>
            <input type="text" name='new-name' id='new-name' placeholder='Enter new name' />
          </div>
          <button type='submit'>Rename</button>
          <div>
            <label htmlFor="delete">Delete product group</label>
            <select name='delete' id='delete' >
              <option>Product 1</option>
              <option>Product 2</option>
              <option>Product 3</option>
            </select>
          </div>
          <button type='submit'>Delete</button>
          </form>
            <div className="buttons">
              <button 
                type="button" 
                className="button"
                onClick={() => {
                  history.push("/"); 
                  }}>
                    Cancel
              </button>
              <button 
                type="submit" 
                className="button"
                disabled={this.state.formValid === false}>
                  Save
              </button>
                {}
            </div> 
          </div>
        )
    }
}


AddProductGroup.propType = {
    push: PropTypes.func.isRequired
};