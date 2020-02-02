import React from 'react'
import './App.css'

class Doc extends React.Component {

 render () {
  const { name, partnum,vernum, formattype, reldate, author, descr, path} = this.props
   return (
    <>
    <tr style={{background: "#aaa", cursor:'pointer'}}>
    <td>{name}</td>
      <td>{partnum}</td>
      <td>{vernum}</td>
      <td>{formattype}</td>
      <td>{reldate}</td>
    </tr>
    <tr style={{background: 'lightgray'}}>
      <td colSpan="6">
        <h4>Description</h4>
        <ul> 
          <li>{descr}</li>
          <li>Author: {author}</li>
          <li><button><a href={path} target="_blank">OPEN</a></button></li>
        </ul>
      </td>
    </tr>
    </>
   )
 }
}

export default Doc