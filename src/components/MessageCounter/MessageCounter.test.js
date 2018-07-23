import React from 'react';
import MessageCounter from './index';
import {shallow} from 'enzyme';

describe('<MessageCounter/>', ()=>{
  it('renders <MessageCounter />', ()=>{
    shallow(<MessageCounter/>);
  })
})