import React from 'react';
import MessageSingle from './index';
import { expect } from 'chai';
import {shallow} from 'enzyme';



describe('<MessageSingle />', ()=>{
  //check if component renders
  it('renders without crashing', ()=>{
    shallow(<MessageSingle />);
  });
  //check if it gets MessageSingle-input
  it('renders MessageSingle-input', ()=>{
    const wrapper = shallow(<MessageSingle />);
    expect(wrapper.find('.MessageSingle-input')).to.have.length(1);
  })
})