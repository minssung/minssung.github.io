import * as React from 'react';
import { graphql, HeadFC } from 'gatsby';
import Layout from '../components/layout';
import Posts from '../templates/posts';

interface HomePageQuery {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
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
  // console.log('index data', data);
  return <Layout>{Posts()}</Layout>;
};

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export const Head: HeadFC = () => <title>minssung's blog</title>;
