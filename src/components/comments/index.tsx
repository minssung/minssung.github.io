import { getTheme } from '@utils/theme';
import React, { useEffect, useRef } from 'react';

const Comments = () => {
  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const giscus = document.createElement('script');
    const htmlElement = document.documentElement;

    const giscusConfig = {
      src: 'https://giscus.app/client.js',
      'data-repo': 'minssung/minssung.github.io',
      'data-repo-id': 'R_kgDOHMH5pQ',
      'data-category': 'Comments',
      'data-category-id': 'DIC_kwDOHMH5pc4Cmyu0',
      'data-mapping': 'pathname',
      'data-strict': '0',
      'data-reactions-enabled': '0',
      'data-emit-metadata': '0',
      'data-input-position': 'top',
      'data-theme': getTheme(),
      'data-lang': 'ko',
      'data-loading': 'lazy',
      crossorigin: 'anonymous',
      async: true,
    };

    Object.entries(giscusConfig).forEach(([key, value]) => {
      giscus.setAttribute(key, value.toString());
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-theme'
        ) {
          const iframe = document.querySelector<HTMLIFrameElement>(
            'iframe.giscus-frame',
          );
          if (!iframe) return;

          const theme = htmlElement.getAttribute('data-theme') || 'light';
          iframe.contentWindow?.postMessage(
            { giscus: { setConfig: { theme } } },
            'https://giscus.app',
          );
        }
      });
    });

    observer.observe(htmlElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    if (commentRef.current) {
      commentRef.current.appendChild(giscus);
    }

    return () => {
      observer.disconnect();
      commentRef.current?.removeChild(giscus);
    };
  }, []);

  return <div ref={commentRef} />;
};

export default Comments;
