import React from 'react';
import { useSiteMetadata } from '@hooks/useSiteMetadata';

export const SEO = ({
  title,
  description,
  image,
  pathname,
  children,
}: {
  title?: string;
  description?: string;
  image?: string;
  pathname?: string;
  children?: React.ReactNode;
}) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image: defaultImage,
    siteUrl,
  } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname || ``}`,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content={defaultTitle} />
      <link rel="canonical" href={seo.url} />
      {children}
    </>
  );
};
