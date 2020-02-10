import React, { Component } from 'react';
import axios from 'axios';
import UserDocsContext from './UserDocsContext';
import config from './config';
/* import {Progress} from 'reactstrap'; */
/* import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; */
import './Upload.css'
class UploadFile extends Component {

  constructor(props){
    super(props);
    this.state = {
      /* Upload params: */
      success : false,
      url : "",
      error: false,
      errorMessage : "",
      /* Doc metadata: */ 
      title:"",
      productSelect: "",
      partnum: "",
      vernum: "", 
      formattype: "",
      reldate: "",
      author: "",
      descr: "No description",
      productId: "",
      path: "https://google.com",
      /* else */
      formValid: false,
      titleValid: false,
      vernumValid: false,
      authorValid: false,
      productSelectValid: false,
      validationMessage: null
    }
  }
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
    }, () => { this.validateEntry(name, value) });
  }
  getFormatSelection(e) {
    let selection;
      selection = e.target.selectedOptions[0].value;
      e.target.
      this.setState({
        formattype: selection
      })
    
  }
  validateEntry(name, value) {
    let hasErrors = false;

    value = value.trim();
    if ((name === 'title') || (name === 'vernum')) {
      if (value.length < 1) {
        hasErrors = true
      }
      else {
        hasErrors = false
      }
    }
    else if ((name === 'productSelect') && (value === 'Select')) {
      hasErrors = true
    }
    else {
      hasErrors = false
    }
    this.setState({
      [`${name}Valid`]: !hasErrors,
    }, this.formValid);
  }
  formValid() {
    const { titleValid, productSelectValid, vernumValid, vernum, authorValid} = this.state;
    if (titleValid && productSelectValid && vernumValid && (vernum !== 0) && authorValid === true) {
      this.setState({
        formValid: true,
        validationMessage: null
      });
    }
    else {
      this.setState({
        formValid: !this.formValid,
        validationMessage: 'This field is required.'
      })
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const { title, productId, partnum, vernum, formattype, reldate, descr, author, path } = this.state;
    const doc = {
      name: title,
      productid: productId,
      partnum: partnum,
      vernum: vernum,
      formattype: formattype,
      reldate: reldate || new Date(),
      descr: descr,
      author: author,
      path: path
    }

    this.setState({ error: null })

    fetch(`${config.API_ENDPOINT}/docs`, {
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
        this.props.history.push("/") 
        window.location.reload()
        this.context.addDoc(data)
      })
      .catch(err => {
        this.setState({ err })
      })
  }
  /* Upload */
  handleChange = (ev) => {
    this.setState({success: false, url : ""});

  }
  handleUpload = (ev) => {
    ev.preventDefault();
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload");
    axios.post(`${config.API_ENDPOINT}/upload`,{
      fileName : fileName,
      fileType : fileType
    })
    .then(response => {
      var returnData = response.data.data.returnData;
      var signedRequest = returnData.signedRequest;
      var url = returnData.url;
      this.setState({url: url, path: url})
      
      console.log("Recieved a signed request " + signedRequest);

      var options = {
        headers: {
          'Content-Type': fileType
        }
      };
      axios.put(signedRequest,file,options)
      .then(result => {
        console.log("Response from s3")
        this.setState({success: true});
      })
      .catch(error => {
        alert("ERROR " + JSON.stringify(error));
      })
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
  }
 /* upload end */

  render() {
    const { history } = this.props;
 /* metadata options */
    const products = this.context.products;
    const options = products.map((product) => {
      return (
        <option
          key={product.id}
          id={product.id}>
          {product.name}
        </option>
      )
    })
 /* metadata options end */
 /* upload options */
    const SuccessMessage = () => (
      <div style={{padding:50}}>
        <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
        {/* <a href={this.state.url}>Access the file here</a> */}
        <div className="buttons">
            <button
              type="submit"
              className="button"
              disabled={!this.state.formValid}>
              CONFIRM? 
            </button>
            <div className="buttons">
              <button 
                type="button" 
                className="button"
                onClick={() => {
                  history.push("/"); 
                  }}>
                    ABORT
              </button>
             </div> 
          </div>
        <br/>
      </div>
    )
    const ErrorMessage = () => (
      <div style={{padding:50}}>
        <h3 style={{color: 'red'}}>FAILED UPLOAD</h3>
        <span style={{color: 'red', backgroundColor: 'black'}}>ERROR: </span>
        <span>{this.state.errorMessage}</span>
        <br/>
      </div>
    )
    /* upload options end */
    return (
      <div className="upload" id="add-doc">
        <a href="/#" className="close" onClick={() => {
          history.push("/"); 
          }}>
        </a>
        <header>
          <h3>Upload Document</h3>
        </header>
        <form 
          className="doc-form"
          onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="doc-name">Document name</label>
            <input
              type="text"
              className="field"
              name="title"
              id="title"
              aria-label="Title"
              aria-required="true"
              placeholder='Document Name'
              onChange={e => this.updateFormEntry(e)} />
              <label htmlFor="part-number">Browse file</label>
            <input 
              name="select-file"
              id="select-file"
              onChange={this.handleChange}
              ref={(ref) => { this.uploadInput = ref; }} 
              type="file"/>
            <label htmlFor="part-number">Part number</label>
            <input
              type="text"
              className="field"
              name="partnum"
              id="title"
              aria-label="Part number"
              aria-required="false"
              placeholder='optional'
              onChange={e => this.updateFormEntry(e)} />
            <label htmlFor="version">Version</label>
            <input type="number"
              className="field"
              name='vernum'
              id='version'
              aria-label="Version"
              aria-required="true"
              required
              placeholder='Enter version number'
              onChange={e => this.updateFormEntry(e)} />
            <label htmlFor="format">Format</label>
            <select name='formattype' 
              id='format' 
              onChange={(e) => this.setState({ formattype: e.target.value })}>
                <option value>Select one</option>
                <option value="PDF">PDF</option>
                <option value="DOCX">DOCX</option>
                <option value="XSL">XSL</option>
                <option value="PPT">PPT</option>
                <option value="mp4">mp4</option>
              </select>
              <label htmlFor="reldate">Release Date</label>
            <input
              type="date"
              className="field"
              name="reldate"
              id="title"
              aria-label="Release Date"
              aria-required="false"
              placeholder='today'
              onChange={e => this.setState({ reldate: e.target.value })} />
            <label htmlFor="descr">Description</label>
            <textarea
              type="textfield"
              className="textfield-description"
              name="descr"
              id="descr"
              aria-label="Description"
              aria-required="false"
              placeholder='Describe the contents of this doc (optional)'
              onChange={e => this.setState({ descr: e.target.value })} />
            <label htmlFor="doc-name">Author</label>
            <input
              type="text"
              className="field"
              name="author"
              id="author"
              aria-label="Author"
              aria-required="true"
              placeholder='Author'
              onChange={e => this.updateFormEntry(e)} />
          </div>
          <div className="form-group">
            <label htmlFor="product-select">Assign to product group</label>
            <select
              type="text"
              className="field"
              name="productSelect"
              id="product-select"
              aria-label="product"
              aria-required="true"
              ref={this.productSelect}
              onChange={e => this.updateFormEntry(e)}>
              <option>Select</option>
              {options}
            </select>
          </div>
          {/* <div className="buttons">
            <button
              type="submit"
              className="button"
              disabled={!this.state.formValid}>
              Submit Doc
            </button>
          </div> */}
       {/*  </form> 
        <form className="doc-form"> */}
        {/* <h3>UPLOAD FILE</h3> */}
          {this.state.success ? <SuccessMessage/> : null}
          {this.state.error ? <ErrorMessage/> : null}
          <button 
          onClick={this.handleUpload}
          className="button"
          disabled={!this.state.formValid}>
            UPLOAD DOC
          </button>
        <div className="buttons">
              <button 
                type="button" 
                className="button"
                onClick={() => {
                  history.push("/"); 
                  }}>
                    Cancel
              </button>
          </div> 
        </form>
      </div>
    );
  }
}

export default UploadFile;