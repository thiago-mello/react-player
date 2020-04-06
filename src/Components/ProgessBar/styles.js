import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 8px;
  background: rgba(191, 191, 191, 0.7);
  height: 3px;
  border-radius: 8px;
  transition: 0.3s;

  &:hover {
    height: 5px;
  }

  .played-bar {
    display: flex;
    align-items: center;
    background: ${(props) => props.theme.primary};
    width: ${(props) => (props.progress ? `${props.progress}%` : 0)};
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
  }

  &:hover .current-time {
    transform: scale(1, 1);
  }
`;
