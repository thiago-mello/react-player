import React, { useState, useEffect } from 'react';

import Video from '../Video';
import { Container } from './styles';
import Controls from '../Controls';

export default function VideoPlayer(props) {
  const { src, type, loop, muted: mutedProp = false } = props;

  const [playing, setPlaying] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [muted, setMuted] = useState(mutedProp);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const container = document.getElementById('video-container');
    container.onfullscreenchange = () => {
      if (!document.fullscreenElement) {
        setFullscreen(false);
      }
    };
  });

  // Controlls Fullscreen behavior of the container
  useEffect(() => {
    const container = document.getElementById('video-container');

    if (fullscreen && container.requestFullscreen) {
      container.requestFullscreen();
    }

    if (!fullscreen && document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [fullscreen]);

  return (
    <Container id="video-container" fullscreen={fullscreen}>
      <Video
        playing={[playing, setPlaying]}
        volume={volume}
        src={src}
        type={type}
        loop={loop}
        muted={muted}
      />
      <Controls
        playing={[playing, setPlaying]}
        fullscreen={[fullscreen, setFullscreen]}
        muted={[muted, setMuted]}
        volume={setVolume}
      />
    </Container>
  );
}
