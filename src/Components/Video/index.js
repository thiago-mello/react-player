import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function Video(props) {
  const { src, type, loop, muted, onClick } = props;
  const [playing, setPlaying] = props.playing;
  const [, setLoading] = props.loading;
  const volume = props.volume;
  const setCurrentTime = props.currentTime;
  const { timeChange } = props;
  const setDuration = props.duration;
  const setBufferedTime = props.bufferedTime;

  const [canPlay, setCanPlay] = useState(false);

  const player = useRef();

  useEffect(() => {
    const video = player.current;
    const { duration } = video;
    setDuration(duration);
  });

  useEffect(() => {
    const video = player.current;
    playing && canPlay ? video.play() : video.pause();
  }, [playing, canPlay]);

  useEffect(() => {
    const video = player.current;
    video.volume = volume;
  }, [volume]);

  useEffect(() => {
    const video = player.current;
    video.currentTime = timeChange;
  }, [timeChange]);

  function handleCanPlay() {
    setCanPlay(true);
    setLoading(false);
  }

  function handleTimeUpdate() {
    const video = player.current;
    const { currentTime } = video;
    setCurrentTime(currentTime);
  }

  function handleBuffer() {
    const video = player.current;
    const { buffered } = video;

    for (let i = 0; i < buffered.length; i++) {
      if (buffered.start(buffered.length - i - 1) < video.currentTime) {
        setBufferedTime(
          buffered.end(buffered.length - i - 1) - video.currentTime
        );
        break;
      }
    }
  }

  return (
    <video
      id="video-player"
      ref={player}
      onEnded={() => setPlaying(false)}
      onCanPlay={handleCanPlay}
      loop={loop}
      muted={muted}
      onTimeUpdate={handleTimeUpdate}
      onWaitingCapture={() => setLoading(true)}
      onProgress={handleBuffer}
      preload="auto"
      onClick={onClick}
    >
      <source src={src} type={type} />
    </video>
  );
}

Video.propTypes = {
  src: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  loop: PropTypes.bool,
  muted: PropTypes.bool.isRequired,
  playing: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
  ).isRequired,
  loading: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
  ).isRequired,
  volume: PropTypes.number.isRequired,
  currentTime: PropTypes.func.isRequired,
  timeChange: PropTypes.number.isRequired,
  duration: PropTypes.func.isRequired,
  bufferedTime: PropTypes.func.isRequired,
};
