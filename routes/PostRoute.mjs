'use strict';

//Definindo os principais módulos
import { Router } from 'express';
import PostController from '../controllers/PostController.mjs';
const router = Router();

router
      .post('/criar-conta', PostController.cadastro)   
      .post('/login', PostController.login)
export default router;