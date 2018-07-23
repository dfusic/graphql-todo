import React from 'react';
import MessageInput from './index';
import {shallow} from 'enzyme';

it('renders without crashing', ()=>{
  shallow(<MessageInput />);
});