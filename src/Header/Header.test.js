import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Header from './Header';
import ReactDOM from 'react-dom';


describe(`Header component`, () => {
  const props = {
    id: 'a',
    className: 'test-class-name',
  };

  it('renders a .Header by default', () => {
    const wrapper = shallow(<Header />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders the Header given props', () => {
    const wrapper = shallow(<Header {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  })
})
describe("Header renders properly", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
       <Header />,
      div
    );
    ReactDOM.unmountComponentAtNode(div)
  });
});