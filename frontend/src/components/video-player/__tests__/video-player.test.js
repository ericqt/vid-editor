import '@testing-library/jest-dom'
import {render, fireEvent, screen} from '@testing-library/react';
import { shallow, mount, render as erender } from 'enzyme';
import '../../../setup-tests';
import VideoPlayer from '../video-player';


describe('VideoPlayer', () => {
  const player = jest.fn()
  const setPlayer = jest.fn()
  const { getByRole } = render(
    <VideoPlayer
      player={player}
      setPlayer={setPlayer}
      url='./Tears_400_x265.mp4'
    />
  )
  describe('handleSlider', () => {


    test('calls setSliderValue', () => {

    });

    test('calls player.seekTo', () => {

    });

  });
});
