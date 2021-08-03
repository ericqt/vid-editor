import '@testing-library/jest-dom';
import App from '../../../app';
import {render, fireEvent, screen} from '@testing-library/react';
import Editor, {outputCutTimes} from '../editor';


describe('Editor', () => {
  it('renders cut times table', () => {
    //const cuttimes = screen.getByRole('cuttimes');
    render(outputCutTimes([[1337,7331]]));
    const start_time = screen.getByText('1337');
    const end_time = screen.getByText('7331');
    expect(start_time).toHaveTextContent('1337')
    expect(end_time).toHaveTextContent('7331')
  });
});

describe('Start Cut', () => {
  it('saves start and end times to cut times', () => {
    let player = jest.fn()
    player.getCurrentTime = jest.fn()
      .mockImplementationOnce(() => 'blah')
      .mockImplementationOnce(() => 'foo')
    let cutTimes = [[]]
    let setCutTimes = jest.fn().mockImplementation(
      (cutData) => { cutTimes = cutData });
    let cutState = true;
    let getCutState = () => cutState;
    let setCutState = jest.fn().mockImplementation(
      (incomingState) => { cutState = incomingState });
    let rendered = render(<Editor
        player={player}
        cutTimes={cutTimes}
        setCutTimes={setCutTimes}
        startCut={cutState}
        setCutState={setCutState}
      />);
    const cut_time_btn = screen.getByText('Cut Time')
    console.log('the test cut state is: ', cutState);
    fireEvent.click(cut_time_btn)
    console.log('the test cut state is: ', cutState);
    fireEvent.click(cut_time_btn)
    console.log('the test cut state is: ', cutState);
    expect(setCutState).toHaveBeenCalledTimes(2);
    //the cutSTate is not being changed inside the clipsHandler. Have to figure out why
  });
});
