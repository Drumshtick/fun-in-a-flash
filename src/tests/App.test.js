import React from 'react';
import { shallow } from "enzyme";
import Home from "../pages/index";

describe('Test App Entry point', function () {
  it('should have a header tag with Welcome to Next.js!', function () {
    const wrapper = shallow(<Home/>);
    expect(wrapper.find("h1").text()).toEqual("Welcome to Next.js!");
  });
});
