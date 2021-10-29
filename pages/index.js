import React from 'react';
import axios from 'axios';
import { server } from '../lib/server';
import withSession from '../lib/section';
import Meta from '../components/Meta';
import ProductList from '../components/Index/ProductList';
import ProductPagination from '../components/Index/ProductPagination';

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
    props: { data },
  };
});
