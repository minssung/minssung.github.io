import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Header from './header';
import { darkTheme, GlobalStyles, lightTheme } from '../../theme';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
    const localTheme = window.localStorage.getItem('theme') as 'light' | 'dark';
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  const toggleTheme = React.useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    window.localStorage.setItem('theme', newTheme);
  }, [theme]);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />

      <Header theme={theme} toggleTheme={toggleTheme} />

      <Main>{children}</Main>
    </ThemeProvider>
  );
};

export default Layout;

const Main = styled.main`
  flex-grow: 1;
  padding: 40px;
  box-shadow: ${({ theme }) => `0 0 4px 0 ${theme.boxShadowColor}`};
`;
