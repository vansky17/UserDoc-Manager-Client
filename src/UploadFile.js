import React, { Component } from 'react';
import axios from 'axios';
import UserDocsContext from './UserDocsContext';
/* import {Progress} from 'reactstrap'; */
/* import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; */
import './Upload.css'
class UploadFile extends Component {

  constructor(props){
    super(props);
    this.state = {
      success : false,
      url : "",
      error: false,
      errorMessage : ""
    }
  }
  static contextType = UserDocsContext;
  handleChange = (ev) => {
    this.setState({success: false, url : ""});

  }
  handleUpload = (ev) => {
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload");
    axios.post("http://localhost:8000/api/upload",{
      fileName : fileName,
      fileType : fileType
    })
    .then(response => {
      var returnData = response.data.data.returnData;
      var signedRequest = returnData.signedRequest;
      var url = returnData.url;
      this.setState({url: url})
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


  render() {
    const { history } = this.props;
    const SuccessMessage = () => (
      <div style={{padding:50}}>
        <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
        <a href={this.state.url}>Access the file here</a>
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
    return (
      <div className="upload" id="add-doc">
        <a href="/#" className="close" onClick={() => {
          history.push("/"); 
          }}>
        </a>
        <header>
          <h3>Upload Document</h3>
        </header>
        <form className='upload-form'>
        <div>
            <label htmlFor="doc-name">Document name</label>
            <input placeholder='Document Name' type="text" name='doc-name' id='doc-name' />
          </div>
          <div>
            <label htmlFor="part-number">Part number</label>
            <input type="text" name='part-number' id='part-number' placeholder='Enter part number' />
          </div>
          <div>
            <label htmlFor="version">Version</label>
            <input type="number" name='version' id='version' />
          </div>
          <div>
            <label htmlFor="format">Format</label>
            <select name='format' id='format' placeholder='pdf'>
              <option>pdf</option>
              <option>docx</option>
              <option>xsl</option>
              <option>ppt</option>
              <option>html</option>
            </select>
          </div>
          <div>
            <label htmlFor="release-date">Release date</label>
            <input type="text" name='release-date' id='release-date' placeholder="YYYY-MM-DD"/>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea type="textfield" name='description' id='description'></textarea>
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <input type="text" name='author' id='author' />
          </div>
          <div>
            <label htmlFor="pg">Assign to product group</label>
            <select name='pg' id='pg'>
              <option>Product 1</option>
              <option>Product 2</option>
              <option>Product 3</option>
            </select>
          </div>
        </form>
        
        <h3>UPLOAD FILE</h3>
          {this.state.success ? <SuccessMessage/> : null}
          {this.state.error ? <ErrorMessage/> : null}
          <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
          <br/>
          <button onClick={this.handleUpload}>UPLOAD</button>
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
      </div>
    );
  }
}

export default UploadFile;