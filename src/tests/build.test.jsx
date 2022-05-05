import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../pages/index'
import renderConnected from '../helpers/renderConnected'
describe('Home', () => {
  let wrapper, getByText;
  const initialState = {

  }

  beforeEach(() => {
    const utils = renderConnected(<Home />, { initialState });
    wrapper = utils.container;
    getByText = utils.getByText;
  });

  it('renders the component', () => {
    expect(wrapper.querySelector('.false')).toBeInTheDocument();
  });
})
