import * as React from "react";
import styled from 'styled-components';
import Header from './header';
import GlobalStyle from "../../styles/GlobalStyle";

const Layout = ({ children }: { children: React.ReactNode | React.ReactNode[]; }) => {
  
  return (
    <React.Fragment>
      <GlobalStyle />
      <Header />
      <main>
        {children}
      </main>
    </React.Fragment>
  );
};

export default Layout;
