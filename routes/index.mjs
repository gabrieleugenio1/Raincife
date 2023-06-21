'use strict';
import get from './GetRoute.mjs';
import post from './PostRoute.mjs';

//Pegando todas as rotas
export default app => {
    app.use(
        get, post
    )
};