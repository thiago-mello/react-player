import React, { useState, useCallback, useMemo } from 'react';
import { Button, Zoom, Slider } from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
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

import { Container } from './styles';
import ProgressBar from '../ProgressBar';

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

  const getTimeString = useMemo(() => {
    const time = moment.utc(currentTime * 1000);
    const durationTime = moment.utc(duration * 1000).format('m:ss');
    const durationString =
      durationTime !== 'Invalid date' ? durationTime : '0:00';

    return `${time.format('m:ss')} / ${durationString}`;
  }, [currentTime, duration]);

  return (
    <Container fullscreen={fullscreen}>
      <ProgressBar
        duration={duration}
        currentTime={[currentTime, setCurrentTime]}
        timeChange={setTimeChange}
        playing={[playing, setPlaying]}
      />
      <div id="main">
        <div className="right-group">
          <Button className="play-button" onClick={handlePlay}>
            {playing ? (
              <MdPause size={28} color="#e0e0e0" />
            ) : (
              <MdPlayArrow size={28} color="#e0e0e0" />
            )}
          </Button>
          <span className="time-string">{getTimeString}</span>
        </div>

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

Controls.propTypes = {
  playing: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
  ).isRequired,
  fullscreen: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
  ).isRequired,
  muted: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
  ).isRequired,
  volume: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.func])
  ).isRequired,
  duration: PropTypes.number.isRequired,
  currentTime: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.func])
  ).isRequired,
  timeChange: PropTypes.func.isRequired,
};
