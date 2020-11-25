import {useState} from 'react';
import VideoPlayer from './components/video-player/video-player';

const App = () => {

  const [player, setPlayer] = useState(null);
  const [cutTimes, setCutTimes] = useState([[]]);
  const [startCut, setCutState] = useState(true);
  const someUrl = './assets/videos/test_clip.mp4';

  return(
    <div>
      <VideoPlayer
        player={player}
        setPlayer={setPlayer}
        url={someUrl}
      />
    </div>
  )
}

export default App;
