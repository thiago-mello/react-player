import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #444;
  width: 100%;
  max-width: ${(props) => (props.width ? props.width : '853px')};
  max-height: ${(props) => (props.height ? props.height : '480px')};

  video {
    width: 100%;
    height: 100%;
  }

  ${(props) =>
    !props.fullscreen &&
    css`
      &:hover #controls {
        opacity: 1;
      }

      video {
        height: ${(props) => (props.height ? props.height : '480px')};
      }
    `}
`;
