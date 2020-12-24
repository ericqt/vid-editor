import '@testing-library/jest-dom'

import {render, rerender, fireEvent, screen} from '@testing-library/react';
import SeekBar from '../seek-bar';
import * as VideoPlayer from '../../video-player';

jest.mock('../../video-player');

describe('handleSlider gets changed', () => {

  let sliderValue = 43;
  const handleSlider = jest.fn()
  const player = jest.fn()
  const { getByRole } = render(
    <SeekBar
      sliderValue={sliderValue}
      handleSlider={handleSlider}
      player={player}
      min={0}
      videoDuration={100}
    />
  );
  const sliderHandle = getByRole('sliderhandle');

  beforeAll( () => {
  });

  test('calls sliderHandle', () => {
    fireEvent.change(sliderHandle, {target: {value: 23}});
    expect(handleSlider).toHaveBeenCalledTimes(1);
  });

});
