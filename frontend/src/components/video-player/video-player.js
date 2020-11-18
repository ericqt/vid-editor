import {useState} from 'react';
import ReactPlayer from 'react-player';
import SeekBar from './seek-bar/seek-bar';
import styled from 'styled-components';

const VideoContainer = styled.div`
  position: relative;
  margin: 10px;
`;

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

  const handleSlider = (ev, newValue) => {
    console.log('in the handleSlider', newValue);
  }

return (
      <VideoContainer>
        <ReactPlayer
          controls={true}
          onReady={handleReady}
          onProgress={handleProgress}
          url='./assets/videos/test_clip.mp4'
        />
        <SeekBar
          sliderValue={sliderValue}
          setSliderValue={handleSlider}
          player={props.player}
        />
        <p>the slidervalue is {sliderValue}</p>
      </VideoContainer>
)

}

export default VideoPlayer;
