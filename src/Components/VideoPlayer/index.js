import React, { useState, useEffect } from 'react';

import Video from '../Video';
import { Container, LoadingIcon } from './styles';
import Controls from '../Controls';
import PropTypes from 'prop-types';

export default function VideoPlayer(props) {
  const {
    src,
    type,
    loop,
    muted: mutedProp = false,
    width = '853px',
    height = 'auto',
  } = props;

  const [playing, setPlaying] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [muted, setMuted] = useState(mutedProp);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [timeChange, setTimeChange] = useState(0);
  const [duration, setDuration] = useState(1);
  const [loading, setLoading] = useState(false);

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
    <Container
      id="video-container"
      fullscreen={fullscreen}
      width={width}
      height={height}
    >
      {loading ? (
        <LoadingIcon color="#fff" style={{ position: 'absolute' }} />
      ) : null}
      <Video
        playing={[playing, setPlaying]}
        volume={volume}
        src={src}
        type={type}
        loop={loop}
        muted={muted}
        loading={[loading, setLoading]}
        currentTime={setCurrentTime}
        timeChange={timeChange}
        duration={setDuration}
      />
      <Controls
        playing={[playing, setPlaying]}
        fullscreen={[fullscreen, setFullscreen]}
        muted={[muted, setMuted]}
        volume={[volume, setVolume]}
        currentTime={[currentTime, setCurrentTime]}
        timeChange={setTimeChange}
        duration={duration}
      />
    </Container>
  );
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
};
