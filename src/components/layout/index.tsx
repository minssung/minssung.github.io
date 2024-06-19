import * as React from 'react';

import Header from './header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <Header />
      <main
        style={{
          flexGrow: 1,
          padding: '20px',
          boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.2)',
        }}
      >
        {children}
      </main>
    </React.Fragment>
  );
};

export default Layout;
