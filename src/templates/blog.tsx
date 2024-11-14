import React from 'react';
import { graphql } from 'gatsby';
import Layout from '@components/layout';
import { SEO } from '@components/seo';

interface Query {
  data: {
    markdownRemark: {
      frontmatter: {
        data: string;
        path: string;
        title: string;
      };
      html: string;
      excerpt: string;
    };
  };
}

export default function Template({ data }: Query) {
  const { markdownRemark: post } = data;

  return (
    <Layout>
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
      excerpt(pruneLength: 150)
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        path
      }
    }
  }
`;

export const Head = ({ data }: Query) => {
  const { markdownRemark: post } = data;
  return <SEO title={post.frontmatter.title} description={post.excerpt} />;
};
