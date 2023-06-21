'use strict';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import validarUser from '../functions/validarUser.mjs';
import Users from '../models/User.mjs';
import { Op } from 'sequelize';

export default class PostController {

    static async cadastro (req, res) {
        const user = req.body;
        const validacao = validarUser(user); 
        console.log(validacao)
         if(validacao?.emailCel) {
            const salt = genSaltSync(10);
            const senhaCriptografada = hashSync(validacao.senha, salt); 
            try {
                if(validacao?.tipoConta === "email") {        
                    await Users.create({nome: validacao.nome, email: validacao.emailCel, senha: senhaCriptografada, 
                        dataNascimento: validacao.dataNascimento, morro: validacao.localizacao});    
                } else {             
                    await Users.create({nome: validacao.nome, telefone: validacao.emailCel, senha: senhaCriptografada, 
                        dataNascimento: validacao.dataNascimento,morro: validacao.localizacao});    
                };
                req.flash("sucess", "Conta criada com sucesso!");
                return res.status(201).redirect("/");     
            } catch (error) {
                if (error.name === 'SequelizeUniqueConstraintError') {
                  req.flash("erros", "Email ou telefone já está cadastrado.");
                  console.log('Email ou telefone já está cadastrado.');
                  return res.status(400).redirect("/cadastro");     
                } else {                 
                  console.error('Ocorreu um erro ao inserir os dados:', error);
                };
            };                
        };  
        req.flash("erros", validacao ?? "Dados inválidos ou faltando.");      
        return res.status(400).redirect("/cadastro");     
    };

    static async login (req, res) {
        const { emailCel, senha } = req.body;

        if (!emailCel || !senha) {
          req.flash("erros", "Login ou senha inválidos.");
          return res.status(400).redirect("/login");
        }
        
        await Users.findOne({
          where: {
            [Op.or]: [
              { email: emailCel },
              { telefone: emailCel }
            ]
          }
        }).then(user => {
          if (user) {
            if (compareSync(senha, user.senha)) {
              req.session.user = {
                id: user.id,
                nome: user.nome,
                email: user.email,
                telefone: user.telefone,
                morro: user.morro,
                dataNascimento: user.dataNascimento
              };
              return res.status(200).redirect("/home");
            } else {
              req.flash("erros", "Login ou senha inválidos.");
              return res.status(400).redirect("/login");
            }
          } else {
            req.flash("erros", "Login ou senha inválidos.");
            return res.status(400).redirect("/login");
          }
        });
    };
}