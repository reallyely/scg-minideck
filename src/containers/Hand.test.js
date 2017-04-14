import React from 'react';
import ReactDOM from 'react-dom';
import Hand from './Hand';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const cards = [
    {
      name: 'This name',
      type: 'this type',
      image: 'this image'
    },
    {
      name: 'This name 2',
      type: 'this type 2',
      image: 'this image 2'
    }
  ];
  ReactDOM.render(<Hand cards={{cards}}/>, div);
})
