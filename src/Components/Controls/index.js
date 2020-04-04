import React from 'react';

import { Container } from './styles';

export default function Controls(props) {
  const [playing, setPlaying] = props.playing;
  const [fullscreen, setFullscreen] = props.fullscreen;
  const [muted, setMuted] = props.muted;
  const setVolume = props.volume;

  function handleFullscreen() {
    setFullscreen(!fullscreen);
  }

  function handlePlay() {
    if (playing) {
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  }

  function handleVolumeChange({ target }) {
    setVolume(target.valueAsNumber);

    if (muted) {
      setMuted(false);
    }
  }

  return (
    <Container fullscreen={fullscreen}>
      <button onClick={handlePlay}>Play/Pause</button>
      <button onClick={handleFullscreen}>Fullscreen</button>
      <button onClick={() => setMuted(!muted)}>Mute</button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.1}
        defaultValue={1}
        onInput={handleVolumeChange}
      />
    </Container>
  );
}
