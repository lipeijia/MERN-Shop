import React from 'react';
import Layout from '../components/_app/Layout';
import '../styles/globals.css';
import { SWRConfig } from 'swr';
import fetch from '../lib/fetchJson';

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetch,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
export default MyApp;
