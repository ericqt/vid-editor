import {useState} from 'react';
import VideoPlayer from './components/video-player/video-player';
import Editor from './components/editor/editor';

const App = () => {

  const [player, setPlayer] = useState(null);
  const [cutTimes, setCutTimes] = useState([
    [],
  ]);
  const [startCut, setCutState] = useState(true);
  const someUrl = './assets/videos/test_clip.mp4';

  return(
    <div>
      <VideoPlayer
        player={player}
        setPlayer={setPlayer}
        url={someUrl}
      />
      <Editor
        player={player}
        cutTimes={cutTimes}
        setCutTimes={setCutTimes}
        startCut={startCut}
        setCutState={setCutState}
      />
    </div>
  )
}

export default App;
