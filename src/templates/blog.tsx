import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '@components/layout';

interface Query {
  data: {
    markdownRemark: {
      frontmatter: {
        data: string;
        path: string;
        title: string;
      };
      html: string;
    };
  };
}

export default function Template({ data }: Query) {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <Helmet
        title={`min.log - ${post.frontmatter.title}`}
        meta={[
          { name: 'description', content: '모든 게 내 맘대로 블로그' },
          { name: 'keywords', content: '블로그, 일상, 개발, 프로그래밍' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { property: 'og:title', content: `${post.frontmatter.title}` },
          { property: 'og:description', content: '모든 게 내 맘대로 블로그' },
        ]}
      />
      <div className="blog-post">
        <h2>{post.frontmatter.title}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        path
      }
    }
  }
`;
