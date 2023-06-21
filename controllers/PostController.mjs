'use strict';
import { genSaltSync, hashSync } from 'bcrypt';
import validarUser from '../functions/validarUser.mjs';
import Users from '../models/User.mjs';

export default class PostController {

    static async cadastro (req, res) {
        const user = req.body;
        const validacao = validarUser(user);  
         if(validacao?.emailCel) {
            const salt = genSaltSync(10);
            const senhaCriptografada = hashSync(validacao.senha, salt); 
            try {
                if(validacao?.tipoConta === "email"){        
                    await Users.create({email: validacao.emailCel, senha: senhaCriptografada, 
                        dataNascimento: validacao.dataNascimento,morro: validacao.localizacao});                             
                }else{             
                    await Users.create({telefone: validacao.emailCel, senha: senhaCriptografada, 
                        dataNascimento: validacao.dataNascimento,morro: validacao.localizacao});    
                };
                return res.status(201).redirect("/");     
            } catch (error) {
                if (error.name === 'SequelizeUniqueConstraintError') {
                  console.log('O email ou telefone já está cadastrado.');
                } else {                 
                  console.error('Ocorreu um erro ao inserir os dados:', error);
                };
            };                
        };        
        return res.status(400).redirect("/cadastro");     
    };

    static async login (req, res) {
        const user = req.body;       

        if(validarUser?.emailCel){
            return res.status(200).redirect("/");     
        }
        
        return res.status(200).redirect("/cadastro");     
    };
}