import '@testing-library/jest-dom'

import renderer from 'react-test-renderer';
import {render, rerender, fireEvent, screen} from '@testing-library/react';
import SeekBar from '../seek-bar';

test('SliderHandle moves according to sliderValue', () => {
  let sliderValue = 0.43;
  const result = render(
    <SeekBar
      sliderValue={sliderValue}
      setSliderValue={() => jest.fn()}
      player={() => jest.fn()}
    />
  );
  const sliderHandle = result.getByRole('sliderhandle');
  const slider = result.getByRole('sliderwhole');
  console.log(slider);
  expect(sliderHandle).toHaveStyle('left: 43%');
})
