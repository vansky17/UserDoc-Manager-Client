import React from "react";
import { Route, Link, Switch} from "react-router-dom";
import { withRouter } from "react-router";
import UserDocsContext from "../UserDocsContext";
import UploadFile from "../UploadFile";
import AddProductGroup from "../AddProductGroup";
import Sidebar from "../Sidebar/Sidebar"
import Header from '../Header/Header'
import ProductGroup from '../ProductGroup/ProductGroup'
import "./App.css";
import Config from '../config'
const API = Config.API_ENDPOINT;

const getDocsForProduct = (docs=[], productid) => { 
  if (!productid) {
    throw new Error("Invalid product ID!")
  } else {
    return docs.filter(doc => doc.productid === productid)
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      files:[],
      errorBoundaryKey: 0
    };
  }
   getDocsForProduct = (docs=[], productid) => { 
    if (!productid) {
      throw new Error("Invalid product ID!")
    } else {
      return docs.filter(doc => doc.productid === productid)
    }
  }

  handleAddProduct = (product, docs) => {
    product.docs = getDocsForProduct(docs, product.id)
    this.setState({
      products: [...this.state.products, product]
    });
  };
/*   handleAddDoc = doc => {
    this.setState({
      docs: [...this.state.docs, doc]
    });
  }; */
  handleUploadFile = file => {
    this.setState({
      files: [...this.state.files, file]
    });
  };

  componentDidMount() {
    Promise.all([fetch(`${API}/docs`), fetch(`${API}/products`)])
      .then(([docsRes, productsRes]) => {
        if (!docsRes.ok) return docsRes.json().then(e => Promise.reject(e));
        if (!productsRes.ok)
          return productsRes.json().then(e => Promise.reject(e));
        return Promise.all([docsRes.json(), productsRes.json()]);
      })
      .then(([docs, products]) => {
        products.map(product => {
          return this.handleAddProduct(product, docs);
        });
        /* docs.map(doc => {
          return this.handleAddDoc(doc);
        }); */
      })
      .catch(error => {
        console.error( error );
      });
  }
  
  render() {
    const contextValue = {
      docs: this.state.docs,
      products: this.state.products,
      files: this.state.files,
      toggle: this.state.toggle,
      toggleErrors: this.handleErrorToggle,
      addDoc: this.handleAddNote,
      uploadFile: this.handleUploadFile,
      addProduct: this.handleAddProduct,
      /* deleteNote: this.handleDeleteNote, */
      deleteProduct: this.handleDeleteFolder,
      back: this.handleBackButton
    };
    console.log( this.state.products)
    return (
      <UserDocsContext.Provider value={contextValue}>
        <div className="App">
          <Sidebar></Sidebar> 
          <Route path='/main'> 
            <main role="main">
            <Header></Header>
            {/* <ProductGroup></ProductGroup>
            <ProductGroup></ProductGroup>
            <ProductGroup></ProductGroup> */}
            {this.state.products.map(product =>
            <ProductGroup
              key={product.id}
              id={product.id}
              name={product.name}
              docs={product.docs}
            >    
            </ProductGroup>
          )}
            <Switch>
              <Route path="/upload-file" exact component={UploadFile} />
              <Route path="/add-product" exact component={AddProductGroup} />
            </Switch>
            </main>
          </Route>
        </div>
      </UserDocsContext.Provider>
    );
  }
}

export default withRouter(App);
