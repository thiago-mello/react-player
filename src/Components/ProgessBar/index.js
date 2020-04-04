import React from 'react';

import { Container } from './styles';

export default function ProgessBar() {
  return (
    <Container>
      <span className="played-bar" />
      <span className="current-time" />
      <span className="buffered" />
    </Container>
  );
}
