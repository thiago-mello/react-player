import React, { useMemo } from 'react';

import { Container } from './styles';

export default function ProgessBar(props) {
  const [currentTime] = props.currentTime;
  const { duration } = props;

  const progressWidth = useMemo(() => {
    const width = (currentTime / duration) * 100;

    return width <= 100 ? width : 0;
  }, [currentTime, duration]);

  return (
    <Container progress={progressWidth}>
      <div className="played-bar">
        <div className="current-time" />
      </div>
      <div className="buffered" />
    </Container>
  );
}
