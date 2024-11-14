import { graphql, useStaticQuery } from 'gatsby';

interface SiteMetadata {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      image: string;
      siteUrl: string;
    };
  };
}

export const useSiteMetadata = () => {
  const data: SiteMetadata = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          description
          image
          siteUrl
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
