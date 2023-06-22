'use strict';

//Definindo os principais módulos
import { Router } from 'express';
import PostController from '../controllers/PostController.mjs';
import Middleware from '../middlewares/Middlewares.mjs';
const router = Router();

router
      .post('/criar-conta', Middleware.jaEstaAutenticado, PostController.cadastro)  
      .post('/envio-link', Middleware.jaEstaAutenticado, PostController.envioLink) 
      .post('/criar-nova-senha', Middleware.jaEstaAutenticado, PostController.criarNovaSenha) 
      .post('/login-conta', Middleware.jaEstaAutenticado, PostController.login)
export default router;