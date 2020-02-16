import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Doc from './Doc'


describe(`Doc component`, () => {
  const props = {
     name: "name",
     partnum: "partnum",
     vernum: 1, 
    formattype: "PDF",
    reldate: new Date(2018, 12, 15), 
    author: 'IS',
    descr: "No description",
    path: "google.com" 
}

  it('renders a .Doc by default', () => {
    const wrapper = shallow(<Doc />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the Doc given props', () => {
    const wrapper = shallow(<Doc {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})