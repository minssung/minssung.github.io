import * as React from 'react';
import styled from 'styled-components';

import Header from './header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <Header />
      <Main>{children}</Main>
    </React.Fragment>
  );
};

export default Layout;

const Main = styled.main`
  flex-grow: 1;
  padding: 40px;
  box-shadow: 0 0 4px 0 var(--box-shadow-color);
`;
