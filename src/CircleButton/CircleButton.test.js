import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ReactDOM from 'react-dom'
import CircleButton from './CircleButton'

describe(`CircleButton component`, () => {
  const props = {
    tag: 'a',
    className: 'test-class-name',
    children: <p>test children</p>,
    'data-other': 'test-other-prop'
  };

  it('renders a button.CircleButton by default', () => {
    const wrapper = shallow(<CircleButton />)
    expect(toJson(wrapper)).toMatchSnapshot()
  });

  it('renders the circle button from props', () => {
    const wrapper = shallow(<CircleButton {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  describe("Button renders properly", () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
         <CircleButton />,
        div
      );
      ReactDOM.unmountComponentAtNode(div)
    });
  });
});
