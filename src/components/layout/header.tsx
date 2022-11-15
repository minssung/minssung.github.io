import * as React from "react";
import styled from 'styled-components';

const StyledHeader = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  background-color: aliceblue;
  padding: 20px;
`;

const Profile = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const Header = () => {

  return (
    <StyledHeader>
      <Profile>
        hello
      </Profile>
    </StyledHeader>
  );
};

export default Header;
