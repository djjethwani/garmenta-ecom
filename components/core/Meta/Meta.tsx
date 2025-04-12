import Head from 'next/head';
import React from 'react';

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

const Meta = ({
  title = "Women's readymade garment wholesale merchant",
  description = 'Garmenta | Buy best and quality products',
  image = 'https://firebasestorage.googleapis.com/v0/b/studiosa-edcac.appspot.com/o/images%2F1715606933303Garmenta%20(1).jpg?alt=media',
}: Props) => {
  const siteTitle = `Garmenta | ${title}`;

  return (
    <Head>
      <title>{siteTitle}</title>

      <meta name="twitter:card" content={description} />

      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {/* <meta name="viewport" content="width=device-width, user-scalable=no" /> */}
    </Head>
  );
};

export default Meta;
