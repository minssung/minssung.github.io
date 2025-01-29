import path from 'path';
import { GatsbyNode } from 'gatsby';

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
  stage,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { createPage } = actions;

  interface QueryResult {
    data?: {
      allMarkdownRemark: {
        edges: Array<{
          node: {
            frontmatter: {
              path: string;
            };
          };
        }>;
      };
    };
    errors?: Array<{
      message: string;
    }>;
  }

  const result: QueryResult = await graphql(`
    query GetPages {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const blogPostTemplate = path.resolve(`src/templates/blog.tsx`);
  const posts = result?.data?.allMarkdownRemark?.edges || [];
  posts.forEach(({ node }: { node: { frontmatter: { path: string } } }) => {
    const path = node.frontmatter.path;
    createPage({
      path,
      component: blogPostTemplate,
      context: {
        pagePath: path,
      },
    });
  });
};
