import React, { useEffect, useState } from 'react';

export default function Video(props) {
  const { src, type, loop, muted } = props;
  const [playing, setPlaying] = props.playing;
  const volume = props.volume;
  const setCurrentTime = props.currentTime;
  const setDuration = props.duration;

  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const player = document.getElementById('video-player');
    const { duration } = player;
    setDuration(duration);
  });

  useEffect(() => {
    const player = document.getElementById('video-player');
    playing && canPlay ? player.play() : player.pause();
  }, [playing, canPlay]);

  useEffect(() => {
    const player = document.getElementById('video-player');
    player.volume = volume;
  }, [volume]);

  function handleTimeUpdate() {
    const player = document.getElementById('video-player');
    const { currentTime } = player;
    setCurrentTime(currentTime);
  }

  return (
    <video
      id="video-player"
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
