import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Header from './Header'

describe(`Header component`, () => {
  const props = {
    id: 'a',
    name: 'test-class-name',
    modified: new Date(2020, 2, 15),
  }

  it('renders a .Header by default', () => {
    const wrapper = shallow(<Header />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the Header given props', () => {
    const wrapper = shallow(<Header {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})