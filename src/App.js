import React from 'react';
import { ThemeProvider } from 'styled-components';

import VideoPlayer from './Components/VideoPlayer';
import GlobalStyle from './styles/global';

const theme = {
  primary: '#3477e3', // '#d92b88',
  buttons: '#e0e0e0',
  text: '#fff',
};

function App() {
  return (
    <div className="App">
      <h1>
        <ThemeProvider theme={theme}>
          <VideoPlayer
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
            loop
          />
        </ThemeProvider>

        <GlobalStyle />
      </h1>
    </div>
  );
}
export default App;
