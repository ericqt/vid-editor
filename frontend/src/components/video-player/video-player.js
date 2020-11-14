import {useState} from 'react';
import ReactPlayer from 'react-player';
import SeekBar from './seek-bar/seek-bar';

const VideoPlayer = (props) => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleReady = (vidya) => {
    console.log('the video is ready');
    props.setPlayer(vidya);
  }

  const handleProgress = (progressObj) => {
    let timePlayed = props.player.getCurrentTime();
    let videoLength = props.player.getDuration();
    setSliderValue(timePlayed/videoLength);
  }

return (
      <div className="videoplayer">
        <ReactPlayer
          controls={true}
          onReady={handleReady}
          onProgress={handleProgress}
          url='./assets/videos/test_clip.mp4'
        />
          <SeekBar
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
            player={props.player}
          />
        <p>the slidervalue is {sliderValue}</p>
      </div>
)

}

export default VideoPlayer;
