import React, {useState} from 'react';
import ReactPlayer from 'react-player';
import SeekBar from './components/progress-bar';
// ES2015+ import
import { Slider, Direction } from 'react-player-controls'

const WHITE_SMOKE = '#eee'
const GRAY = '#878c88'
const GREEN = '#72d687'
const HORIZONTAL_BAR_WIDTH = 400

const App = () => {

  const [count, setCount] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  // A colored bar that will represent the current value
  const SliderBar = ({ direction, style }) => (
    <div
      style={Object.assign({}, {
        position: 'absolute',
        background: GRAY,
        borderRadius: 4,
      }, direction === Direction.HORIZONTAL ? {
        top: 0,
        bottom: 0,
        left: 0,
        width: `${100}%`,
      } : {}, style)}
    />
  )

  // A handle to indicate the current value
  const SliderHandle = ({ direction, value, style }) => {
    console.log('inside sliderhandle');
    return (
      <div
        style={Object.assign({}, {
          position: 'absolute',
          width: 16,
          height: 16,
          background: GREEN,
          borderRadius: '100%',
          transform: 'scale(1)',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.3)',
          }
        }, direction === Direction.HORIZONTAL ? {
          top: 0,
          left: `${sliderValue * 100}%`,
          marginTop: -4,
          marginLeft: -8,
        } : {}, style)}
      />
    )
  }

  const foo = (blarg) => {
    console.log('wutwut ', blarg);
    setSliderValue(blarg);
  };

  // A composite progress bar component
  const ProgressBar = ({sliderValue, sliderValueSetter}) => {
    console.log('what is the onchange function? ', sliderValueSetter);
    return (
      <Slider
        isEnabled={true}
        direction={Direction.HORIZONTAL}
        onChange={setSliderValue}
        style={{
          width: HORIZONTAL_BAR_WIDTH,
          height: 8,
          transition: 'width 0.1s',
          cursor: 'pointer',
        }}
      >
        <SliderBar direction={Direction.HORIZONTAL} value={sliderValue} style={{ background: GREEN }} />
        <SliderHandle
          direction={Direction.HORIZONTAL}
          value={sliderValue}
          style={{ background:GREEN }}
        />
      </Slider>
    )
  }

  const handleProgress = (progressObj) =>{
    console.log(progressObj);
  }

  return(
    <div>
      <ReactPlayer
        controls={true}
        onProgress={handleProgress}
        url='./assets/videos/test_clip.mp4'
      />
      <div style={{padding:'30px'}}>
        <ProgressBar
          sliderValue={sliderValue}
          sliderValueSetter={foo}
        />
      </div>
      <p>you clicked {count} times biiiiiiitch</p>
      <p>the slidervalue is {sliderValue}</p>
      <button onClick={() => setCount(count+1)}>
        hello there
      </button>
    </div>
  )
}

export default App;
