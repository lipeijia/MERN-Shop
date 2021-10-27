import React, { createContext } from 'react';
import ProductList from '../components/Index/ProductList';
import { server } from '../lib/server';
import Meta from '../components/Meta';
import axios from 'axios';
import ProductPagination from '../components/Index/ProductPagination';
import withSession from '../lib/section';

// export const userContext = createContext();

export default function Home({ data }) {
  return (
    <>
      <Meta />
      <ProductList products={data.products} />
      <ProductPagination totalPages={data.totalPages} />
    </>
  );
}

export const getServerSideProps = withSession(async (ctx) => {
  const page = ctx.query.page ? ctx.query.page : '1';
  const size = 9;
  const payload = { params: { page, size } };
  const res = await axios.get(`${server}/api/product`, payload);
  const data = JSON.parse(JSON.stringify(res.data));
  return {
    props: { data, user: ctx.req.session.get('user') },
  };
});
