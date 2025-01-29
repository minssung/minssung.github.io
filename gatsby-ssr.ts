import React from 'react';
import { GatsbySSR } from 'gatsby';

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setPreBodyComponents,
}) => {
  setPreBodyComponents([
    React.createElement('script', {
      key: 'darkmode-script',
      dangerouslySetInnerHTML: {
        __html: `
          (function() {
            function getInitialColorMode() {
              const persistedColorPreference = window.localStorage.getItem('theme');
              const hasPersistedPreference = typeof persistedColorPreference === 'string';
              if (hasPersistedPreference) {
                return persistedColorPreference;
              }
              const mql = window.matchMedia('(prefers-color-scheme: dark)');
              const hasMediaQueryPreference = typeof mql.matches === 'boolean';
              if (hasMediaQueryPreference) {
                return mql.matches ? 'dark' : 'light';
              }
              return 'light';
            }
            const colorMode = getInitialColorMode();
            document.documentElement.setAttribute('data-theme', colorMode);
          })()
        `,
      },
    }),
  ]);
};
