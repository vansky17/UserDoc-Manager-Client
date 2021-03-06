import React from 'react';
import UserDocsContext from './UserDocsContext';
import config from './config';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faDatabase } from "@fortawesome/free-solid-svg-icons";
import './App/App.css';
import './Upload.css';

export default class AddProductGroup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hasErrors: false,
        title: "",
        changedTitle: "",
        productid: "",
        formValid: false,
        titleValid: false,
        delButtonValid: false,
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
        });
      }
    }

    handleSubmit(e) {
      e.preventDefault();
      const {title} = this.state;
      const product = {
        name: title
      };

      this.setState({
        error: null
      });
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
              throw error
            })
          }
          return res.json()
        })
        .then(data => {
          this.goBack()
          this.context.addProduct(data)
        })
        .catch(error => {
          this.setState({
            error
          });
        });
    }
    handleClickDelete = (e) => {
      e.preventDefault();
      fetch(`${config.API_ENDPOINT}/products/${this.state.productid}`, {
        method: 'DELETE',
        headers: {
          'content-Type': 'application/json'
        },
      })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e))
        }
      })
      .then(() => {  
        this.context.deleteProduct(this.state.productid)
        this.props.history.goBack()
        window.location.reload()      
      })
      .catch(err => {
        console.log({ err })
      })
    }
    handleChangeSelect = (event) =>{
      this.setState({ productid: event.target.value });
      if (event.target.value !== 'Select one'){
        this.setState({delButtonValid: true});
      }else {
        this.setState({delButtonValid: false});
      }
        
    }
    render() {
      const { history } = this.props;
      const { products=[] } = this.context;
      return (
          <div className="upload" id="add-pg">
            <a href="/#" className="close" onClick={() => {
              history.push("/"); 
              }}><span style={{opacity:0}}>-</span>
            </a>
            <header>
              <h3>Manage Product Groups</h3>
            </header>
            <form 
                className="doc-form"
                onSubmit={e => this.handleSubmit(e)}>
                <div className="form-group">
                  <label htmlFor="title">Create new product group</label>
                  <input 
                    type="text" 
                    className="field"
                    name="title" 
                    id="title" 
                    aria-label="Title"
                    aria-required="true"
                    placeholder="Product name"
                    aria-placeholder="Product name"
                    onChange={e => this.updateFormEntry(e)}/>
                </div>
                <div >
                 <button 
                    type="submit" 
                    className="button field"
                    disabled={this.state.formValid === false}>
                      <FontAwesomeIcon icon={faDatabase} />
                      <br/>
                     CREATE PRODUCT
                 </button>
                 {}
                </div>
              </form>  
              <form className="doc-form">
                <div className="form-group">
                <label htmlFor="delete">Delete product group</label>
                <select
                className="field"
                 onChange={this.handleChangeSelect} name='delete' id='delete' >
                  <option>Select one</option>
                  {products.map(product => 
                    <option value={product.id} key={product.id}>{product.name}</option>
                  )}
                </select>
              <div >
                  <button 
                    onClick={this.handleClickDelete}
                    type="" 
                    className="button field"
                    disabled={!this.state.delButtonValid}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                    <br/>
                    DELETE PRODUCT
                  </button>
                  {}
                </div>
              </div>
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
                {}
            </div> 
          </div>
        )
    }
}


AddProductGroup.propType = {
    push: PropTypes.func.isRequired
};