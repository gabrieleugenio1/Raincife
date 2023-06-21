'use strict';

//Definindo os principais módulos
import { Router } from 'express';
import PostController from '../controllers/PostController.mjs';
import Middleware from '../middlewares/middleware.mjs';
const router = Router();

router
      .post('/criar-conta', Middleware.jaEstaAutenticado, PostController.cadastro)   
      .post('/login-conta', Middleware.jaEstaAutenticado, PostController.login)
export default router;