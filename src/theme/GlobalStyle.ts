import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './theme';

const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    transition: all 0.3s ease;
  }

  button {
    font-family: inherit;
  }
`;

export default GlobalStyle; 