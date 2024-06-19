import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';

interface PostQuery {
  allMarkdownRemark: {
    edges: {
      node: {
        id: string;
        excerpt: string;
        frontmatter: {
          date: string;
          title: string;
          path: string;
        };
      };
    }[];
  };
}

export default function Posts() {
  const data: PostQuery = useStaticQuery(graphql`
    query PostQuery {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            excerpt(pruneLength: 250)
            id
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
              path
            }
          }
        }
      }
    }
  `);

  const { edges: posts } = data.allMarkdownRemark;
  return (
    <div className="blog-posts">
      {posts
        .filter((post) => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => {
          return (
            <div className="blog-post-preview" key={post.id}>
              <h2>
                <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
              </h2>
              <h3>{post.frontmatter.date}</h3>
              <p>{post.excerpt}</p>
            </div>
          );
        })}
    </div>
  );
}
