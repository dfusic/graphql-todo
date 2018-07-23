import React from 'react';
import {shallow} from 'enzyme';
import App from './App';

// npm test will throw an error because of the GraphQL call
// 1. it will throw the error with the api call
// 2. it will throw the error on MessageContainer.test.js because it gets API data and gets length, but it cant because there is an error with fetching data

it('renders without crashing', ()=>{
  shallow(<App />);
})
