import React from 'react'
import { slideDown, slideUp } from '../anim';
import './Doc.css'

class Doc extends React.Component {
  state = { expanded: false }

  toggleExpander = (e) => {
    if (e.target.type === 'checkbox') return;

    if (!this.state.expanded) {
      this.setState(
        { expanded: true },
        () => {
          if (this.refs.expanderBody) {
            slideDown(this.refs.expanderBody);
          }
        }
      );
    } else {
      slideUp(this.refs.expanderBody, {
        onComplete: () => { this.setState({ expanded: false }); }
      });
    }
  }
   /* formatDate = (str) => {
    return str.substr(0, 10);
  } */
 render () {
  /* const { name, partnum,vernum, formattype, reldate, author, descr, path} = this.props */

  return [
    <tr onClick={this.toggleExpander} className="tr-toggable">
      <td><input style={{display: "none"}} type="checkbox" />Name of document</td>
      <td >1234.5678.01</td>
      <td>1</td>
      <td>PDF</td>
      <td>17-04-01</td>
    </tr>,
    this.state.expanded && (
      <tr className="expandable" key="tr-expander">
        <td className="uk-background-muted" colSpan={7}>
          <div ref="expanderBody" className="inner uk-grid">
            <div >
              <h4>Description</h4>
              <ul> 
                <li>This is a document description</li>
                <li>Author: Some Author </li>
                <li><button>OPEN</button></li>
              </ul>
            </div>
          </div>
        </td>
      </tr>
      )
    ];
   
  }
}

export default Doc