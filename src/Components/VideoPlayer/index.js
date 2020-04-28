import React, { useState, useEffect, useCallback } from 'react';

import Video from '../Video';
import { MdPlayArrow, MdPause } from 'react-icons/md';
import { Container, LoadingIcon, BigIconContainer } from './styles';
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
  const [bufferedTime, setBufferedTime] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [videoCursor, setVideoCursor] = useState('default');
  const [timeOutId, setTimeoutId] = useState();

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

  function handlePauseClick() {
    setPlaying(!playing);
    setIsAnimating(true);
  }

  const handleMouseMove = useCallback(() => {
    setVideoCursor('default');
    clearTimeout(timeOutId);
    if (fullscreen) {
      setTimeoutId(
        setTimeout(() => {
          setVideoCursor('none');
        }, 2000)
      );
    }
  }, [fullscreen, timeOutId]);

  function getBigIcon() {
    return playing ? (
      <MdPlayArrow
        size={96}
        color="#e9e9e9"
        onAnimationEnd={() => setIsAnimating(false)}
      />
    ) : (
      <MdPause
        size={96}
        color="#e9e9e9"
        onAnimationEnd={() => setIsAnimating(false)}
      />
    );
  }

  return (
    <Container
      id="video-container"
      fullscreen={fullscreen}
      width={width}
      height={height}
      cursor={videoCursor}
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
        bufferedTime={setBufferedTime}
        onClick={handlePauseClick}
        onMouseMove={handleMouseMove}
      />
      <BigIconContainer>{isAnimating ? getBigIcon() : null}</BigIconContainer>

      <Controls
        playing={[playing, setPlaying]}
        fullscreen={[fullscreen, setFullscreen]}
        muted={[muted, setMuted]}
        volume={[volume, setVolume]}
        currentTime={[currentTime, setCurrentTime]}
        timeChange={setTimeChange}
        duration={duration}
        bufferedTime={[bufferedTime, setBufferedTime]}
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
