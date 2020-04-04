import React from 'react';

import VideoPlayer from './Components/VideoPlayer';

function App() {
  return (
    <div className="App">
      <h1>
        <VideoPlayer
          src="https://www.srviral.com/content/2020/03/92-841.mp4"
          type="video/mp4"
          loop
        />
      </h1>
    </div>
  );
}
export default App;
