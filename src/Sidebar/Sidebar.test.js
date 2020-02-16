import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Sidebar from './Sidebar'

describe(`Doc component`, () => {
  const props = {
  docs: [
    {
      "id": 24,
      "name": "practice for mockup2",
      "partnum": "34563456",
      "vernum": 1,
      "formattype": "mp4",
      "reldate": "2020-02-12T21:27:48.510Z",
      "author": "John Doe",
      "productid": 6,
      "descr": "No description",
      "path": "https://userdocsmanager.s3.us-east-2.amazonaws.com/notes.png"
  },
  {
      "id": 25,
      "name": "Video",
      "partnum": "127",
      "vernum": 1,
      "formattype": "mp4",
      "reldate": "2020-02-12T21:31:02.972Z",
      "author": "IS",
      "productid": 6,
      "descr": "No description",
      "path": "https://userdocsmanager.s3.us-east-2.amazonaws.com/small.mp4"
  },
  {
      "id": 26,
      "name": "JS-playground 2",
      "partnum": "123.4567",
      "vernum": 1,
      "formattype": "DOCX",
      "reldate": "2020-02-12T22:28:23.585Z",
      "author": "IS",
      "productid": 6,
      "descr": "No description",
      "path": "https://userdocsmanager.s3.us-east-2.amazonaws.com/clean_form_bg.jpg"
  }
  ],
  products: [
    {
      "id": 1,
      "name": "Product Line 1"
    },
    {
      "id": 2,
      "name": "Product Line 2"
    },
    {
      "id": 3,
      "name": "Third Product Line"
    },
    {
      "id": 6,
      "name": "Test Ground"
    }
  ]
}

  it('renders a .Sidebar by default', () => {
    const wrapper = shallow(<Sidebar />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the Sidebar given props', () => {
    const wrapper = shallow(<Sidebar {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})