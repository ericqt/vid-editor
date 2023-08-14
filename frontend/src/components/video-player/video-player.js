import {useState} from 'react';
import ReactPlayer from 'react-player';
import SeekBar from './seek-bar/seek-bar';
import styled from 'styled-components';

const VideoContainer = styled.div`
  position: relative;
  margin: 0.5%;
  display: inline-block;
  width: 49%;
`;

const VideoPlayer = (props) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  const handleReady = (vidya) => {
    console.log('the video is ready');
    props.setPlayer(vidya);
    setSliderValue(vidya.getCurrentTime());
    setVideoDuration(vidya.getDuration());
  }

  const handleProgress = (progressObj) => {
    let timePlayed = props.player.getCurrentTime();
    setSliderValue(timePlayed);
  }

  const handleSlider = (ev, newValue) => {
    console.log('in the handleSlider', ev.target.value);
    setSliderValue(ev.target.value);
    props.player.seekTo(ev.target.value);
  }

  return (
        <VideoContainer>
          <ReactPlayer
            controls={true}
            onReady={handleReady}
            onProgress={handleProgress}
            url={props.url}
            width='100%'
          />
          <SeekBar
            sliderValue={sliderValue}
            handleSlider={handleSlider}
            min={0}
            videoDuration={videoDuration}
            player={props.player}
          />
        </VideoContainer>
  )

}

export default VideoPlayer;
