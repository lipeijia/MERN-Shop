import Head from 'next/head';

export default function Meta({ title, keywords, description }) {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale-1' />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta httpEquiv='Content-Type' content='text/html;charset=UTF-8' />
      <link rel='shortcut icon' href='favicon.ico' type='image/x-icon' />
      <title>{title}</title>
    </Head>
  );
}

Meta.defaultProps = {
  title: 'MERN STACK SHOP',
  keywords: 'web development, next.js, MERN',
  description: 'practicing projects',
};
