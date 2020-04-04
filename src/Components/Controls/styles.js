import styled, { css } from 'styled-components';

export const Container = styled.div.attrs({
  id: 'controls',
})`
  transition: 0.15s linear;
  opacity: 0;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  height: 48px;
  background-color: rgba(0, 0, 0, 0.8);

  ${(props) =>
    props.fullscreen &&
    css`
      &:hover {
        opacity: 1;
      }
    `}
`;
