import React from 'react'
import '../App/App.css'
import Doc from '../Doc/Doc'
import UserDocsContext from "../UserDocsContext";
import PropTypes from 'prop-types';
import uuid from "uuid"; 
class ProductGroup extends React.Component {

  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = UserDocsContext;
  render () {

    const { name, id, docs } = this.props
    console.log(name, id, docs);
    return (
      <>
        <section id={id}>
        {/* <header> */}
        <h3>{name}</h3>
        {/* </header> */}
        <table>
          <tbody>
          <tr>
            <th>Document</th><th>Part Number</th><th>Doc Version</th><th>Format</th><th>Release Date</th>
          </tr> 
{/*           <Doc key={uuid.v4()}/>
          <Doc key={uuid.v4()}/>
          <Doc key={uuid.v4()}/> */}
          { docs.map(doc =>
            <Doc
              key={doc.id}
              id={doc.id}
              name={doc.name}
              partnum={doc.partnum}
              vernum={doc.vernum}
              formattype={doc.formattype}
              reldate={doc.reldate}
              descr={doc.descr}
              author={doc.author}
              productid={doc.productid}
              path={doc.path}
            >    
            </Doc>
          ) }
      </tbody>
        </table>
      </section>
    </>
    )
  }
}

export default ProductGroup
ProductGroup.propType = {
  match: PropTypes.object.isRequired
};