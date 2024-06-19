import * as React from 'react';
import styled from 'styled-components';
import { Github } from 'styled-icons/boxicons-logos';
import { LightMode, DarkMode } from 'styled-icons/material-outlined';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  background-color: aliceblue;
  padding: 5px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

const IconButton = styled.button`
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

const Header = () => {
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
          <div
            style={{
              marginLeft: '20px',
            }}
          >
            <h3>min.log</h3>
          </div>
        </div>

        <div>
          <IconButton onClick={() => alert('구현 준비중입니다.')}>
            <DarkMode width={24} height={24} />
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
