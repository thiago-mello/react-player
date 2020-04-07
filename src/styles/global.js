import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font-family: Roboto, Arial, Helvetica, sans-serif
  }

  *:focus {
    outline: 0;
  }

  button {
    cursor: pointer;
  }
`;
