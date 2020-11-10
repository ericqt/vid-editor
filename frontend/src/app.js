import React, {useState} from 'react';
import ReactPlayer from 'react-player';
import SeekBar from './components/seek-bar';
// ES2015+ import
import { Slider, Direction } from 'react-player-controls'

const WHITE_SMOKE = '#eee'
const GRAY = '#878c88'
const GREEN = '#72d687'
const HORIZONTAL_BAR_WIDTH = 400

const App = () => {

  const [sliderValue, setSliderValue] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [videoLength, setVideoLength] = useState(0);
  const [player, setPlayer] = useState(null);

  const handleProgress = (progressObj) => {
    console.log(progressObj);
    let playedSeconds = progressObj.playedSeconds;
    setPlayedSeconds(progressObj.playedSeconds);
    setSliderValue(playedSeconds/videoLength);
  }

  const handleReady = (vidya) => {
    console.log('the video is ready :', vidya);
    setVideoLength(vidya.getDuration());
    setPlayer(vidya);
  }

  const setVideoTime = (time) => {
    console.log('moving to video time');
    setSliderValue(time);
    player.seekTo(time);
  }

  return(
    <div>
      <ReactPlayer
        controls={true}
        onReady={handleReady}
        onProgress={handleProgress}
        url='./assets/videos/test_clip.mp4'
      />
      <div style={{padding:'30px'}}>
        <SeekBar
          sliderValue={sliderValue}
          sliderValueSetter={setVideoTime}
        />
      </div>
      <p>the slidervalue is {sliderValue}</p>
    </div>
  )
}

export default App;
