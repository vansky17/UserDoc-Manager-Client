import React from 'react';
import ReactDOM from 'react-dom';
import AddProductGroup from './AddProductGroup';

describe("Upload renders properly", () => {
    it('renders without crashing', () => {
      const div = document.createElement('div')
      ReactDOM.render(
         <AddProductGroup />,
        div
      );
      ReactDOM.unmountComponentAtNode(div);
    });
  });