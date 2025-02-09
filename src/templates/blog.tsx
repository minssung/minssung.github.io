import React from 'react';
import { graphql } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';

import Layout from '@components/layout';
import { SEO } from '@components/seo';
import Comments from '@components/comments';

interface Query {
  data: {
    markdownRemark: {
      frontmatter: {
        data: string;
        path: string;
        title: string;
        thumbnail: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
      };
      html: string;
      excerpt: string;
    };
  };
}

export const defaultThumbnail: IGatsbyImageData = {
  layout: 'constrained',
  width: 600,
  height: 30,
  images: {
    fallback: {
      src: '',
      srcSet: '',
      sizes: '',
    },
    sources: [],
  },
};

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
        <Comments />
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
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 600)
          }
        }
      }
    }
  }
`;

export const Head = ({ data }: Query) => {
  const { markdownRemark: post } = data;

  return (
    <SEO
      title={post.frontmatter.title}
      description={post.excerpt}
      image={
        post.frontmatter.thumbnail?.childImageSharp?.gatsbyImageData?.images
          ?.fallback?.src ?? ''
      }
    />
  );
};
