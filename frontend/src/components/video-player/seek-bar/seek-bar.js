import styled from 'styled-components';
import { useEffect, useRef } from 'react';

const GRAY = '#878c88'
const GREEN = '#72d687'
const HORIZONTAL_BAR_WIDTH = 400

const SliderContainer = styled.div`
  position: relative;
  text-align: center;
  width: 98%;
  height: 16px;
  margin: 10px;
  left: 8px;
`

const SliderBar = styled.div`
      position: absolute;
      background: ${GREEN};
      border-radius: 4px;
      top: 4px;
      bottom: 0;
      left: 0;
      right: 0;
      width: 98%;
      height: 8px;
`

const SliderHandle = styled.input`
    -webkit-appearance: none;
    background: transparent;
    position: relative;
    width: 99%;
    height: 8px;
    outline: none;
    border-radius: 4px;
    margin-left: -16px;
    top: 0px;
    ::-webkit-slider-thumb {
      margin-top: -4px;
      width: 16px;
      height: 16px;
      border-radius: 100%;
      transform: scale(1);
      transition: transform 0.2s;
      &:hover {
        transform: scale(1.3);
        background: orange;
      }
      cursor: pointer;
    }
    ::-webkit-slider-runnable-track {
    }
`


// A composite progress bar component
export const SeekBar = (props) => {

  const setVideoTime = (time) => {
    console.log('setting the video time');
    props.setSliderValue(time);
    props.player.seekTo(time);
  }

  if(!props.player)
    return (<div></div>);
  else
    return (
      <SliderContainer>
        <SliderBar
          role='sliderbar'
        />
        <SliderHandle
          onChange={props.handleSlider}
          type='range'
          min={0}
          max={props.videoDuration}
          value={props.sliderValue}
          role='sliderhandle'
        />
      </SliderContainer>
    )
}

export default SeekBar;
