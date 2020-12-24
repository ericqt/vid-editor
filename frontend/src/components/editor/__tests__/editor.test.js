import '@testing-library/jest-dom'
import App from '../../../app';
import {render, fireEvent, screen} from '@testing-library/react';
import Editor, {outputCutTimes} from '../editor';


describe('Editor', () => {
//  const { getByRole } = render(
//    <App />
//  )
  it('renders cut times table', () => {
    //const cuttimes = screen.getByRole('cuttimes');
    render(outputCutTimes([[1,10]]));
    const el = screen.getByText('Start Time');
    console.log(el);
  });
});
