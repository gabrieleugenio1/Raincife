'use strict';
//Definindo os principais módulos
import { Router } from 'express';
import GetController from '../controllers/GetController.mjs';
const router = Router();

router
      .get('/', GetController.index)
      .get('/cadastro', GetController.cadastro)
      .get('/login', GetController.login)
      .get('/home', GetController.home)
export default router;