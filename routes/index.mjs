'use strict';
import principal from './GetRoute.mjs';

//Pegando todas as rotas
export default app =>{
    app.use(
        principal,
        )
};