import '@testing-library/jest-dom'
import App from '../../../app';
import {render, fireEvent, screen} from '@testing-library/react';


describe('Editor', () => {
  const { getByRole } = render(
    <App />
  )
  it('renders cut times table', () => {
    const cuttimes = screen.getByRole('cuttimes');
    console.log(cuttimes);
  });
});
