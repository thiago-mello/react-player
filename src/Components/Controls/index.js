import React, { useState, useCallback } from 'react';
import {
  MdPlayArrow,
  MdFullscreen,
  MdVolumeUp,
  MdVolumeDown,
  MdVolumeOff,
  MdVolumeMute,
  MdPause,
  MdFullscreenExit,
} from 'react-icons/md';
import { Button, Zoom, Slider } from '@material-ui/core';

import { Container } from './styles';
import ProgressBar from '../ProgessBar';

export default function Controls(props) {
  const [volCollapse, setVolCollapse] = useState(false);

  const [playing, setPlaying] = props.playing;
  const [fullscreen, setFullscreen] = props.fullscreen;
  const [muted, setMuted] = props.muted;
  const [volume, setVolume] = props.volume;
  const { duration } = props;
  const [currentTime, setCurrentTime] = props.currentTime;
  const setTimeChange = props.timeChange;

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

  function handleVolumeChange(_, value) {
    setVolume(value);

    if (muted) {
      setMuted(false);
    }
  }

  const getVolumeIcon = useCallback(() => {
    if (muted) {
      return <MdVolumeOff size={28} color="#e0e0e0" />;
    } else if (volume <= 0.5 && volume > 0) {
      return <MdVolumeDown size={28} color="#e0e0e0" />;
    } else if (volume === 0) {
      return <MdVolumeMute size={28} color="#e0e0e0" />;
    }

    return <MdVolumeUp size={28} color="#e0e0e0" />;
  }, [volume, muted]);

  return (
    <Container fullscreen={fullscreen}>
      <ProgressBar
        duration={duration}
        currentTime={[currentTime, setCurrentTime]}
        timeChange={setTimeChange}
        playing={[playing, setPlaying]}
      />
      <div id="main">
        <Button className="play-button" onClick={handlePlay}>
          {playing ? (
            <MdPause size={28} color="#e0e0e0" />
          ) : (
            <MdPlayArrow size={28} color="#e0e0e0" />
          )}
        </Button>

        <div className="left-group">
          <div
            className="volume-group"
            onMouseOver={() => setVolCollapse(true)}
            onMouseOut={() => setVolCollapse(false)}
          >
            <Zoom in={volCollapse}>
              <Slider
                id="volume-slider"
                min={0}
                max={1}
                step={0.1}
                defaultValue={1}
                onChange={handleVolumeChange}
              />
            </Zoom>

            <Button id="mute-button" onClick={() => setMuted(!muted)}>
              {getVolumeIcon(volume)}
            </Button>
          </div>

          <Button onClick={handleFullscreen}>
            {fullscreen ? (
              <MdFullscreenExit size={28} color="#e0e0e0" />
            ) : (
              <MdFullscreen size={28} color="#e0e0e0" />
            )}
          </Button>
        </div>
      </div>
    </Container>
  );
}
