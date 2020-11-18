import '@testing-library/jest-dom'

import {render, fireEvent, screen} from '@testing-library/react';
import VideoPlayer from '../video-player';


test('seekbar changes video time', () => {
  let player = jest.fn();
  let setPlayer = jest.fn();
  const { getByRole } = render(
    <VideoPlayer
      player={player}
      setPlayer={setPlayer}
      url='./Tears_400_x265.mp4'
    />
  )
  // let slider = result.getByRole('slidercontainer');
  let slider = getByRole('seekbarcontainer');
  console.log(slider);
  //fireEvent.change(container, {target: { value: 0.44 }});
});
