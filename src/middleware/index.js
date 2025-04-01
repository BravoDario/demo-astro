import Cookies from 'js-cookie';
import { defineMiddleware } from "astro/middleware";
import { getToken } from '../utilities/tokenChecker';

export const onRequest = defineMiddleware((context, next) => {
    console.log(getToken());

    return next();
});