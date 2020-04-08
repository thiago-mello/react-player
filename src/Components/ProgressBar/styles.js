import styled from 'styled-components';

export const Container = styled.div`
  cursor: pointer;
  display: flex;
  position: relative;
  margin: 0 8px;
  background: rgba(170, 170, 170, 0.7);
  height: 3px;
  border-radius: 8px;
  transition: 0.3s;

  &:hover {
    height: 5px;
  }

  &:hover .current-time {
    transform: scale(1, 1);
  }
`;

export const PlayedBar = styled.div.attrs((props) => ({
  style: {
    width: `${props.progress}%` || 0,
  },
}))`
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.primary};
  height: 100%;
  position: relative;

  .current-time {
    background: ${(props) => props.theme.primary};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    position: absolute;
    left: calc(100% - 4px);
    transform: scale(0, 0);
    transition: 0.3s;
  }
`;

export const BufferedBar = styled.div.attrs((props) => ({
  style: {
    width: `${props.buffered}%` || 0,
  },
}))`
  background: rgba(210, 210, 210, 0.7);
  height: 100%;
`;
