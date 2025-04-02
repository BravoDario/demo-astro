import { defineMiddleware } from "astro/middleware";
import { checkToken } from '../utilities/tokenChecker';

export const onRequest = defineMiddleware((context, next) => {
    const url = context.request.url;

    if (url.includes('/favicon')) {
        const cookie = context.request.headers.get('cookie');

        if (!cookie) {
            return new Response(null, {
                status: 302,
                headers: { Location: '/login' }, 
            });
        }

        const parsedCookies = Object.fromEntries(cookie.split('; ').map(cookie => cookie.split('=')));
        const token = parsedCookies['token-demo'];
        const isLogin = checkToken(token);

        if (!token || !isLogin.isLogin) {
            return new Response(null, {
                status: 302,
                headers: { Location: '/login' },
            });
        }
    }

    return next();
});