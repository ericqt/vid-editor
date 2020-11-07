import React, {useState} from 'react';
import ReactPlayer from 'react-player';
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
  const SliderHandle = ({ direction, style }) => {
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
          left: `${sliderValue}%`,
          marginTop: -4,
          marginLeft: -8,
        } : {}, style)}
      />
    )
  }

  // A composite progress bar component
  const ProgressBar = ({ isEnabled, direction, value, ...props }) => (
    <Slider
      direction={direction}
      onChange={(blah) => setSliderValue(blah * 100)}
      onChangeStart={(blah) => setSliderValue(blah * 100)}
      style={{
        width: direction === Direction.HORIZONTAL ? HORIZONTAL_BAR_WIDTH : 8,
        height: 8,
        borderRadius: 4,
        background: WHITE_SMOKE,
        transition: direction === Direction.HORIZONTAL ? 'width 0.1s' : 'height 0.1s',
        cursor: isEnabled === true ? 'pointer' : 'default',
      }}
      {...props}
    >
      <SliderBar direction={direction} value={value} style={{ background: isEnabled ? GREEN : GRAY }} />
      <SliderHandle
        direction={direction}
        style={{ background: isEnabled ? GREEN : GRAY }}
      />
    </Slider>
  )

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
      <p>you clicked {count} times biiiiiiitch</p>
      <p>the slidervalue is {sliderValue}</p>
      <button onClick={() => setCount(count+1)}>
        hello there
      </button>

      {console.log('the bar value is: ', sliderValue)}
      <div style={{padding:'30px'}}>
        <ProgressBar
          isEnabled={true}
          direction={Direction.HORIZONTAL}
          value={sliderValue}
        />
      </div>

    </div>
  )
}

export default App;
