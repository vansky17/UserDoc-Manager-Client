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
        changedTitle: "",
        productid: "",
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
      const {title} = this.state;
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
          this.context.addProduct(data)
        })
        .catch(error => {
          this.setState({
            error
          })
        })
    }
    handleClickDelete = (e) => {
      e.preventDefault()
      const {productId} = this.state.productid
      console.log(this.state.productid)
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
        /* this.props.history.push("/") */
        this.props.history.goBack()
        window.location.reload()      
      })
      .catch(err => {
        console.log({ err })
      })
    }
    handleChangeSelect = (event) =>{
      this.setState({ productid: event.target.value })
    }
    render() {
      const { history } = this.props;
      const { products=[] } = this.context
      return (
          <div className="upload" id="add-pg">
            <a href="/#" className="close" onClick={() => {
              history.push("/"); 
              }}>
            </a>
            <header>
              <h3>Manage product groups</h3>
            </header>
            <form 
                className=""
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
                <div className="buttons">
                 <button 
                    type="submit" 
                    className="button"
                    disabled={this.state.formValid === false}>
                     Create
                 </button>
                 {}
                </div>
              </form>  
              <form className="">
                <div className="form-group">
                <label htmlFor="delete">Delete product group</label>
                <select onChange={this.handleChangeSelect} name='delete' id='delete' >
                  <option>Select one</option>
                  {products.map(product => 
                    <option value={product.id} key={product.id}>{product.name}</option>
                  )}
                </select>
              <div className="buttons">
                  <button 
                    onClick={this.handleClickDelete}
                    type="" 
                    className="button"
                      /* disabled={} */>
                    Delete
                  </button>
                  {}
                  </div>
              </div>
              </form>
          {/*
            <label htmlFor="delete">Delete product group</label>
            <select name='delete' id='delete' >
              <option>Product 1</option>
              <option>Product 2</option>
              <option>Product 3</option>
            </select>
          </div>
          <button type='submit'>Delete</button>
          </form> */}
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