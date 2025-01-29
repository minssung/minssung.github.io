import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Github } from 'styled-icons/boxicons-logos';
import { LightMode, DarkMode } from 'styled-icons/material-outlined';

import { getTheme, toggleTheme } from '@utils/theme';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  padding: 5px 20px;
  box-shadow: 0 0 4px var(--box-shadow-color);
`;

const IconButton = styled.button`
  color: ${({ theme }) => theme.text};
  padding: 8px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
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
  const theme = getTheme();

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
          <IconButton onClick={toggleTheme}>
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
