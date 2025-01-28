import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#fef7f7',
  text: '#000000',
  gray: '#efefef',

  boxShadowColor: 'rgba(0, 0, 0, 0.2)',
};

export const darkTheme = {
  body: '#222',
  text: '#ddd',
  gray: '#333',

  boxShadowColor: 'rgba(255, 255, 255, 0.8)',
};

export const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        transition: background-color 0.3s, color 0.3s;
    }
    `;
