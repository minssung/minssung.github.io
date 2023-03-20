import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

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
    <div className="blog-post-container">
      <Helmet title={`Your Blog Name - ${post.frontmatter.title}`} />
      <div className="blog-post">
        <h1>{post.frontmatter.title}</h1>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </div>
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
