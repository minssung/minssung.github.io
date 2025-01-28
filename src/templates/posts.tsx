import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image';

import { PostCard } from '@components/card';
import { defaultThumbnail } from './blog';

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
          thumbnail: {
            childImageSharp: {
              gatsbyImageData: IGatsbyImageData;
            };
          };
          tags: string[];
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
            excerpt(pruneLength: 200)
            id
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
              path
              thumbnail {
                childImageSharp {
                  gatsbyImageData(width: 600)
                }
              }
              tags
            }
          }
        }
      }
    }
  `);

  const { edges: posts } = data.allMarkdownRemark;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
      }}
    >
      {posts
        .filter((post) => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => {
          const thumbnail =
            getImage(
              post.frontmatter.thumbnail?.childImageSharp?.gatsbyImageData,
            ) ?? defaultThumbnail;

          return (
            <Link
              key={post.id}
              to={post.frontmatter.path}
              style={{ color: 'inherit' }}
            >
              <PostCard
                title={post.frontmatter.title}
                date={post.frontmatter.date}
                tags={post.frontmatter.tags}
                image={thumbnail}
              />
            </Link>
          );
        })}
    </div>
  );
}
