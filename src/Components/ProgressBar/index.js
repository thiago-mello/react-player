import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import { Container, PlayedBar, BufferedBar } from './styles';

export default function ProgressBar(props) {
  const [currentTime, setCurrentTime] = props.currentTime;
  const { duration } = props;
  const [bufferedTime, setBufferedTime] = props.bufferedTime;
  const setTimeChange = props.timeChange;
  const [playing, setPlaying] = props.playing;
  let playingMemory = useRef(false);

  const progressContainer = useRef();

  const progressWidth = useMemo(() => {
    const width = (currentTime / duration) * 100;

    return width <= 100 ? width : 0;
  }, [currentTime, duration]);

  const bufferedWidth = useMemo(() => {
    let width;
    if (bufferedTime + currentTime <= duration) {
      width = (bufferedTime / duration) * 100;
    } else {
      width = ((duration - currentTime) / duration) * 100;
    }

    return width;
  }, [bufferedTime, currentTime, duration]);

  function handleProgressClick(event) {
    setBufferedTime(0);
    playingMemory.current = playing;
    const { screenX } = event;
    const progress = progressContainer.current;
    const container = progress.getBoundingClientRect();
    const durationPercentage = (screenX - container['x']) / container['width'];

    setTimeChange(durationPercentage * duration);
    setCurrentTime(durationPercentage * duration);
  }

  function handleDrag(event) {
    setBufferedTime(0);
    setPlaying(false);
    const { screenX } = event;
    const progress = progressContainer.current;
    const container = progress.getBoundingClientRect();
    let durationPercentage = (screenX - container['x']) / container['width'];

    if (durationPercentage >= 1) {
      durationPercentage = 1;
    }
    if (durationPercentage !== 0) {
      setCurrentTime(durationPercentage * duration);
    }
  }

  function handleMouseUp(event) {
    const { screenX } = event;
    const progress = progressContainer.current;
    const container = progress.getBoundingClientRect();
    const durationPercentage = (screenX - container['x']) / container['width'];

    setTimeChange(durationPercentage * duration);
    setPlaying(playingMemory.current);
  }

  return (
    <Container
      ref={progressContainer}
      onMouseDown={handleProgressClick}
      onDrag={handleDrag}
      onDragEnd={handleMouseUp}
    >
      <PlayedBar progress={progressWidth}>
        <div className="current-time" />
      </PlayedBar>
      <BufferedBar buffered={bufferedWidth} />
    </Container>
  );
}

ProgressBar.propTypes = {
  currentTime: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.func])
  ).isRequired,
  duration: PropTypes.number.isRequired,
  timeChange: PropTypes.func.isRequired,
  playing: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
  ).isRequired,
  bufferedTime: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.func])
  ).isRequired,
};
