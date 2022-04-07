import {shallow, configure} from 'enzyme';
import {sayHello} from '../helpers/example';


describe("testRender", () =>{
  it("should render hello world", () => {
      const html = sayHello();
  
      const wrapper = shallow(html);
      
      expect(wrapper.text()).toContain("Hello World!");
  });

});
