'use strict';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import validarUser from '../functions/validarUser.mjs';
import Users from '../models/User.mjs';
import { Op, fn } from 'sequelize';
import enviarEmail from '../functions/enviarEmail.mjs';
import gerarCodigo from '../functions/gerarCodigo.mjs';
import Codigo from '../models/Codigo.mjs';
import moment from 'moment';
export default class PostController {

    static async cadastro (req, res) {
        const user = req.body;
        const validacao = validarUser(user); 
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
                req.flash("success", "Conta criada com sucesso!");
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

    static async envioLink (req, res) {
      const email = req.body.email;
        if(email) {
        const codigo = gerarCodigo();
        const usuarioEmail = await Users.findOne({where:{email: email}})      
        if(usuarioEmail) {
          const codigoEmail = await Codigo.create({codigo:codigo, dataGerada: fn('NOW'), UserId:usuarioEmail.id}); 
          const link = req.headers.host + '/esqueci-senha?codigo=' + codigoEmail.codigo + '&' + `email=${usuarioEmail.email}`;
          enviarEmail(link, usuarioEmail.email, req.protocol);            
          req.flash('success','Link para recuperação enviado, caso não encontre, verifique a caixa de spam.');
          return res.status(200).redirect("/esqueci-senha");
        }
      }
      req.flash('erros','Falha ao enviar link.');
      return res.status(400).redirect("/esqueci-senha");  
    }

    static async criarNovaSenha (req, res) {
      const { senhaUm, senhaDois, CodigoHidden, emailQuery} = req.body;

      if(senhaUm === senhaDois && senhaUm?.length >= 6 && CodigoHidden){
          const dataAtual = moment(Date.now());
          let horarioToken;
          let diferenca;
          const salt = genSaltSync(10);
          const senhaCriptografada = hashSync(senhaUm, salt);
          const emailUser = await Codigo.findOne({
            raw: true,
            include: { model: Users },
            where: { codigo: CodigoHidden },
            order: [['dataGerada', 'DESC']]
          });
          if(emailUser) horarioToken = moment(emailUser.dataGerada), diferenca = dataAtual.diff(horarioToken, 'minutes');
          console.log("diferença: " + diferenca);
          if(diferenca <= 5 && (emailUser.ativo === true || emailUser.ativo === 1) && emailQuery === emailUser['User.email']) {
              await Users.update({senha:senhaCriptografada}, {where: {email: emailUser['User.email']}})
              await Codigo.update({ativo:false}, {where: {UserId: emailUser['User.id'], codigo: CodigoHidden}})
              req.flash('success','Alteração feita com sucesso!');
              return res.status(200).redirect("/");
          };
          req.flash('erros','Código expirado ou inexistente.');
          return res.status(400).redirect("/esqueci-senha");
      };
      req.flash('erros','Insira uma senha valida.');
      return res.status(400).redirect(`/esqueci-senha?codigo=${CodigoHidden}`);
  };
}