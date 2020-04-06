import React, { useEffect, useState, useRef } from 'react';

export default function Video(props) {
  const { src, type, loop, muted } = props;
  const [playing, setPlaying] = props.playing;
  const volume = props.volume;
  const setCurrentTime = props.currentTime;
  const { timeChange } = props;
  const setDuration = props.duration;

  const player = useRef();
  const [canPlay, setCanPlay] = useState(false);

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

  function handleTimeUpdate() {
    const video = player.current;
    const { currentTime } = video;
    setCurrentTime(currentTime);
  }

  return (
    <video
      id="video-player"
      ref={player}
      onEnded={() => setPlaying(false)}
      onCanPlay={() => setCanPlay(true)}
      loop={loop}
      muted={muted}
      preload="auto"
      onTimeUpdate={handleTimeUpdate}
    >
      <source src={src} type={type} />
    </video>
  );
}
