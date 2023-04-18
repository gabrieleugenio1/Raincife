'use strict';
//Definindo os principais módulos
import { Router } from 'express';
import PrincipalController from '../controllers/PrincipalController.mjs';
const router = Router();

router
      .get('/', PrincipalController.home)
      
export default router;