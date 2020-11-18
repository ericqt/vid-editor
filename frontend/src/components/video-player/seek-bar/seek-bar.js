import styled from 'styled-components';

const GRAY = '#878c88'
const GREEN = '#72d687'
const HORIZONTAL_BAR_WIDTH = 400

const SliderContainer = styled.div`
  position: absolute;
  width: ${HORIZONTAL_BAR_WIDTH}px;
  height: 16px;
  margin: 10px;
  left: 20%;
`

const SliderBar = styled.div`
      position: absolute;
      background: ${GREEN};
      border-radius: 4px;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 50%;
`

const SliderHandle = styled.div.attrs( props => {
  console.log('incoming value: ', props.value);
})`
    position: relative;
    width: 16px;
    height: 16px;
    background: ${GREEN};
    border-radius: 100%;
    transform: scale(1);
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.3);
      background: orange;
    }
    top: 0px;
    left: 0%;
    margin-top: -4px;
    margin-left: -5px;
    cursor: pointer;
`



// A composite progress bar component
export const SeekBar = (props) => {

  const setVideoTime = (time) => {
    console.log('setting the video time');
    props.setSliderValue(time);
    props.player.seekTo(time);
  }

  return (
    <SliderContainer>
      <SliderBar />
      <SliderHandle />
    </SliderContainer>
  )
}

export default SeekBar;
