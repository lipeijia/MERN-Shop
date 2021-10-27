import cookie from 'js-cookie';
import Router from 'next/router';
import { server } from '../lib/server';

export function handleLogin(token) {
  cookie.set('token', token);
  Router.push('/account');
}

export function redirectUsers(ctx, location) {
  if (!ctx.isReady) {
    window.location.href = `${server}/login`;
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.replace(location);
  }
}
