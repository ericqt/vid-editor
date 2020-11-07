import React, {useState} from 'react';

const App = () => {

  const [count, setCount] = useState(0);

  return(
    <div>
      <p>you clicked {count} times biiiiiiitch</p>
      <button onClick={() => setCount(count+1)}>
        hello there
      </button>
    </div>
  )
}

export default App;
