import React, { useMemo, useRef } from 'react';

import { Container, PlayedBar } from './styles';

export default function ProgessBar(props) {
  const [currentTime, setCurrentTime] = props.currentTime;
  const { duration } = props;
  const setTimeChange = props.timeChange;

  const progressContainer = useRef();

  const progressWidth = useMemo(() => {
    const width = (currentTime / duration) * 100;

    return width <= 100 ? width : 0;
  }, [currentTime, duration]);

  function handleProgressClick(event) {
    const { screenX } = event;
    const progress = progressContainer.current;
    const container = progress.getBoundingClientRect();
    const durationPercentage = (screenX - container['x']) / container['width'];

    setTimeChange(durationPercentage * duration);
    setCurrentTime(durationPercentage * duration);
  }

  return (
    <Container ref={progressContainer} onClick={handleProgressClick}>
      <PlayedBar progress={progressWidth}>
        <div className="current-time" />
      </PlayedBar>
      <div className="buffered" />
    </Container>
  );
}
