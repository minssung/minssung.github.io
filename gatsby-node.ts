import { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import path from 'path';

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
  stage,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
      },
    },
  });
};

// export const onCreatePage: GatsbyNode['createPages'] = async ({ actions, graphql, reporter }) => {
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const result: { data?: any; errors?: any } = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
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
  const posts = result.data.allMarkdownRemark.edges;
  posts.forEach(({ node }: any) => {
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
