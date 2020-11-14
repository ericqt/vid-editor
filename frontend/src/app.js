import {useState} from 'react';
import ReactPlayer from 'react-player';
import SeekBar from './components/seek-bar';

const App = () => {

  const [sliderValue, setSliderValue] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [videoLength, setVideoLength] = useState(0);
  const [player, setPlayer] = useState(null);
  const [cutTimes, setCutTimes] = useState([[]]);
  const [startCut, setCutState] = useState(true);

  const handleProgress = (progressObj) => {
    setPlayedSeconds(progressObj.playedSeconds);
    setSliderValue(playedSeconds/videoLength);
  }

  const handleReady = (vidya) => {
    setVideoLength(vidya.getDuration());
    setPlayer(vidya);
  }

  const setVideoTime = (time) => {
    setSliderValue(time);
    player.seekTo(time);
  }

  const clipsHandler = () => {
    let cutData = cutTimes;
    let playerCurrentTime = player.getCurrentTime();
    console.log('cutTimes data: ', cutTimes);
    console.log('video current time is: ', playerCurrentTime);
    switch (startCut){
      case true:
        cutData[cutData.length - 1][0] = player.getCurrentTime()
        setCutState(false);
        break;
      default:
        cutData[cutData.length - 1][1] = player.getCurrentTime()
        cutData[cutData.length] = [];
        setCutState(true);
    }
    setCutTimes(cutData);

    console.log(cutData);
  }

  return(
    <div>
      <div className="videoplayer">
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
      <div>
        <button onClick={clipsHandler}>
          Cut the video
        </button>
      </div>
    </div>
  )
}

export default App;
