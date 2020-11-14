import {useState} from 'react';
import VideoPlayer from './components/video-player/video-player';

const App = () => {

  const [player, setPlayer] = useState(null);
  const [cutTimes, setCutTimes] = useState([[]]);
  const [startCut, setCutState] = useState(true);

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
      <VideoPlayer
        player={player}
        setPlayer={setPlayer}
      />
      <div>
        <button onClick={clipsHandler}>
          Cut the video
        </button>
      </div>
    </div>
  )
}

export default App;
