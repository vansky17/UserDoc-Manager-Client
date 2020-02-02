import React from 'react';
import UserDocsContext from './UserDocsContext';
import config from './config';
import './NotefulForm/NotefulForm.css';
/* This class is not working yet */
export default class AddDoc extends React.Component {
  state = {
    title: "",
    content: "",
    productSelect: "",
    productId: "",
    formValid: false,
    titleValid: false,
    contentValid: false,
    productSelectValid: false,
    validationMessage: null
  };

  static contextType = UserDocsContext;

  goBack = () => {
    this.props.history.goBack();
  }

    updateFormEntry(e) {       
        const name = e.target.name;
        const value = e.target.value;
        let id;
        if (e.target.selectedOptions) {
            id = e.target.selectedOptions[0].id;
            this.setState({
                'productId': id 
            })
        }
        this.setState({
            [e.target.name]: e.target.value,
            
        }, () => {this.validateEntry(name, value)});
    }

    validateEntry(name, value) {
        let hasErrors = false;

        value = value.trim();
        if((name === 'title') || (name === 'content')) {
            if (value.length < 1) {
                hasErrors = true
            } 

            else {
                hasErrors = false
            }
        }
        
        else if((name === 'productSelect') && (value === 'Select')) {
            hasErrors = true
        }
        
        else {
            hasErrors = false
        }
        
        this.setState({
            [`${name}Valid`]: !hasErrors,
        }, this.formValid );
    }

    formValid() {
        const { titleValid, contentValid, productSelectValid } = this.state;
        if (titleValid && contentValid && productSelectValid === true){
            this.setState({
                formValid: true,
                validationMessage: null
            });
        }
        else {this.setState({
            formValid: !this.formValid,
            validationMessage: 'All fields are required.'
        })}
      }

    handleSubmit(e) {
        e.preventDefault();
        const { title, content, productId } = this.state;
        const doc = {
            /* name: title,
            content: content,
            productid: productId,
            modified: new Date() */
        }

        this.setState({error: null})

        
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            body: JSON.stringify(doc),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => {
                    console.log(`Error is: ${err}`)
                    throw err
                })
            }
            return res.json()
        })
        .then(data => {
            this.goBack()
            this.context.addDoc(data)
        })
        .catch(err => {
            this.setState({ err })
        })
    }

    
    render() {
        const products = this.context.products;
        const options = products.map((product) => {
            return(
            <option 
                key ={product.id} 
                id={product.id}>
            {product.name}
            </option>
            )
        })
        
        return (
            {/* <form 
                className="Noteful-form"
                onSubmit={e => this.handleSubmit(e)}>
                <h2 className="title">Add Product</h2>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input 
                    type="text" 
                    className="field"
                    name="title" 
                    id="title" 
                    aria-label="Title"
                    aria-required="true"
                    placeholder="Title"
                    onChange={e => this.updateFormEntry(e)}/>
                </div>
                <div className="form-group">
                   <label htmlFor="content">Document:</label>
                   <textarea 
                        className="field"
                        name="content" 
                        id="content"
                        aria-label="Note:"
                        aria-required="false"
                        onChange={e => this.updateFormEntry(e)}/>
                </div>
                <div className="form-group">
                  <label htmlFor="folder-select">folder</label>
                  <select 
                    type="text" 
                    className="field"
                    name="folderSelect" 
                    id="folder-select" 
                    aria-label="folder"
                    aria-required="true"
                    ref={this.folderSelect}
                    onChange={e => this.updateFormEntry(e)}>
                        <option>Select</option>
                        { options }
                    </select>
                </div>
                <div className="buttons">
                 <button 
                    type="button" 
                    className="button"
                    onClick={()=> this.goBack()}>
                     Cancel
                 </button>
                 <button 
                    type="submit" 
                    className="button"
                    disabled={!this.state.formValid}>
                     Save
                 </button>
                </div>
            </form>  */}
        )
    }
}