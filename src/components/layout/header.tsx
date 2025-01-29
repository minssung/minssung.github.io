import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Github } from 'styled-icons/boxicons-logos';
import { LightMode, DarkMode } from 'styled-icons/material-outlined';

import { getTheme as getInitialTheme, toggleTheme } from '@utils/theme';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  position: sticky;
  top: 0;
  background-color: var(--bg-color);
  box-shadow: 0 0 4px var(--box-shadow-color);
  opacity: 0.9;
  z-index: 100;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const IconButton = styled.button`
  color: var(--text-color);
  padding: 8px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    background-color: var(--dimmed-light-color);
    transition: 0.3s;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  color: inherit;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  background-color: var(--logo-bg-color);
  padding: 5px 10px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: var(--logo-bg-color);
    transform: translateY(-1px);
    box-shadow: 0 0 8px var(--box-shadow-color);
  }
  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const Header = () => {
  const [theme, setTheme] = React.useState(getInitialTheme());

  const toggleThemeState = () => {
    toggleTheme();
    setTheme(getInitialTheme());
  };

  return (
    <StyledHeader>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <StyledLink to="/">
            <img
              src={'/favicon.ico'}
              style={{ width: 24, height: 24, borderRadius: 16 }}
            />
            <h3 style={{ margin: 0, marginLeft: 4 }}>min.log</h3>
          </StyledLink>
        </div>

        <div>
          <IconButton onClick={toggleThemeState}>
            {theme === 'light' ? (
              <DarkMode width={24} height={24} />
            ) : (
              <LightMode width={24} height={24} />
            )}
          </IconButton>
          <IconButton
            onClick={() => window.open('https://github.com/minssung', '_blank')}
          >
            <Github width={24} height={24} />
          </IconButton>
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
