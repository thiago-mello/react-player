import styled, { css } from 'styled-components';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

export const LoadingIcon = styled(AiOutlineLoading3Quarters).attrs({
  size: 72,
  color: '#FFF',
})`
  animation: rotation linear 1s infinite;

  @keyframes rotation {
    from {
      transform: rotate(1deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
