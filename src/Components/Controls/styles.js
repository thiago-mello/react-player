import styled, { css } from 'styled-components';

export const Container = styled.div.attrs({
  id: 'controls',
})`
  transition: 0.15s linear;
  opacity: 0;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  background: linear-gradient(transparent, rgba(10, 10, 10, 0.6));

  #main {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  ${(props) =>
    props.fullscreen &&
    css`
      &:hover {
        opacity: 1;
      }
    `}

  button {
    transition: 0.2s;

    svg {
      display: flex;
      align-items: center;
    }
  }

  button:hover path {
    transition: 0.2s;
    transform-origin: center;
    transform: scale(1.1, 1.1);
    color: #fff;
  }

  .left-group {
    display: flex;
    align-items: center;

    .volume-group {
      padding: 0;
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;

      #volume-slider {
        color: #fff;
        width: 60px;
        display: none;
      }

      &:hover #volume-slider {
        transition: 0.2s;
        opacity: 1;
        display: block;
      }
    }
  }
`;
