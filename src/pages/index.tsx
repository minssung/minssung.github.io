import * as React from 'react';
import Layout from '@components/layout';
import Posts from '../templates/posts';
import { SEO } from '@components/seo';

interface SiteQuery {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

interface HomePageQuery {
  data: SiteQuery;
  location: {
    hash: string;
    host: string;
    hostname: string;
    href: string;
    key: string;
    origin: string;
    pathname: string;
    port: string;
    protocol: string;
    search: string;
    state: string;
  };
}

export default ({ data, location }: HomePageQuery) => {
  return (
    <Layout>
      <Posts />
    </Layout>
  );
};

export const Head = () => <SEO />;
