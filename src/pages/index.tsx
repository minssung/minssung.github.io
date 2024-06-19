import * as React from 'react';
import { graphql, HeadFC } from 'gatsby';
import Layout from '@components/layout';
import Posts from '../templates/posts';

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

export const Head: HeadFC<SiteQuery> = (props) => {
  const { title } = props.data.site.siteMetadata;
  return <title>{title}</title>;
};
