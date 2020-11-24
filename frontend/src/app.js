import {useState} from 'react';
import VideoPlayer from './components/video-player/video-player';

const App = () => {

  const [player, setPlayer] = useState(null);
  const [cutTimes, setCutTimes] = useState([[]]);
  const [startCut, setCutState] = useState(true);

  return(
    <div>
      <VideoPlayer
        player={player}
        setPlayer={setPlayer}
      />
    </div>
  )
}

export default App;
