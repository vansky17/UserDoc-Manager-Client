import React from 'react'
import { slideDown, slideUp } from '../anim';
import { format } from 'date-fns'
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
  
 render () {
  const { name, partnum,vernum, formattype, reldate, author, descr, path} = this.props 

  return [
    <tr onClick={this.toggleExpander} className="tr-toggable">
 <td><input style={{display: "none"}} type="checkbox" />{name}</td>
  <td >{partnum}</td>
  <td>{vernum}</td>
  <td>{formattype}</td>
  <td>{format(reldate, 'Do MMM YYYY')}</td>
    </tr>,
    this.state.expanded && (
      <tr className="expandable" key="tr-expander">
        <td className="description-background" colSpan={7}>
          <div ref="expanderBody" className="inner uk-grid">
            <div >
              <h4>Description</h4>
              <ul> 
                <li className="descr-text">{descr}</li>
                <li>Author: {author} </li>
                <li><button className="open-doc"><a href={path} target="_blank" rel="noopener noreferrer">OPEN</a></button></li>
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