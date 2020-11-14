import { Slider, Direction } from 'react-player-controls'
import styled from 'styled-components';

const GRAY = '#878c88'
const GREEN = '#72d687'
const HORIZONTAL_BAR_WIDTH = 400

const SliderBar = styled.div.attrs( props => ({
}))`
      position: absolute;
      background: ${GRAY};
      border-radius: 4px;
      top: 0;
      bottom: 0;
      left: 0;
      width: 100%;
`

const SliderHandle = styled.div.attrs( props => {
  console.log('incoming value: ', props.value);
  return ({
  });
})`
    position: absolute;
    width: 16px;
    height: 16px;
    background: ${GREEN};
    border-radius: 100%;
    transform: scale(1);
    transition: transform 0.2s;
    &:hover: {
      transform: scale(1.3);
    }
    top: 0px;
    left: ${props => (props.value * 100)}%;
    margin-top: -4px;
    margin-left: -8px;
`

// A composite progress bar component
export const SeekBar = (props) => {

  const setVideoTime = (time) => {
    console.log('setting the video time');
    props.setSliderValue(time);
    props.player.seekTo(time);
  }

  return (
    <div style={{padding:'30px'}}>
      <Slider
        role='sliderwhole'
        isEnabled={true}
        direction={Direction.HORIZONTAL}
        onChange={setVideoTime}
        style={{
          width: HORIZONTAL_BAR_WIDTH,
          height: 8,
          transition: 'width 0.1s',
          cursor: 'pointer',
        }}
      >
        <SliderBar direction={Direction.HORIZONTAL} value={props.sliderValue} style={{ background: GREEN }} />
        <SliderHandle
          direction={Direction.HORIZONTAL}
          value={props.sliderValue}
          style={{ background:GREEN }}
          role='sliderhandle'
        />
      </Slider>
    </div>
  )
}

export default SeekBar;
