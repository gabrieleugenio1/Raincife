'use strict';
import moment from "moment";

const validarUser = (user) => {

  const validado = {
    nome: user.nome,
    emailCel: user.emailCel,
    senha: user.senha,
    localizacao: user.localizacao,
    dataNascimento: user.dataNascimento,
    tipoConta: null
  };

  /** INICIO DAS VALIDAÇÕES **/      
  const erros = [];     

  const regex = {   
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    senha: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    celular: /^\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$/
  };

  if(validado.emailCel) {
    validado.emailCel = validado.emailCel.trim(); // Limpa espaços em branco no inicio e final do e-mail.
    validado.emailCel = validado.emailCel.toLowerCase(); // Padroniza o e-mail em minúsculo.
    if(validado.emailCel >= 11 && validado.emailCel <= 16) validado.emailCel = validado.emailCel.replace(/[^\w\s]/gi, '');
  };

  
  if(!validado.nome || validado.nome === undefined || validado.nome === null) {
    erros.push({error: "Nome inválido!"});
  };

  if((validado.emailCel || validado.emailCel !== undefined || validado.emailCel !== null) &&  validado.emailCel?.length === 11 && regex.celular.test(validado.emailCel) ){
    validado.tipoConta = "telefone";
  } else if((validado.emailCel || validado.emailCel !== undefined || validado.emailCel !== null) && regex.email.test(validado.emailCel)){
    validado.tipoConta = "email";
  }else {
    erros.push({ error: "E-mail ou Celular inválido!" });
  };

  if(!validado.localizacao || validado.localizacao === undefined || validado.localizacao === null) {
    erros.push({error: "Localização inválida! A localização é predefinida."});
  };

  if (!validado.dataNascimento || validado.dataNascimento === undefined || validado.dataNascimento === null) {
    erros.push({ error: "Data de nascimento inválida!" });
  } else {
    if (!moment(validado.dataNascimento, 'YYYY-MM-DD', true).isValid() || moment(validado.dataNascimento, 'YYYY-MM-DD').isAfter(moment())) {
     erros.push({ error: "Data de nascimento inválida!" });
    };
  };

  if(!validado.senha || validado.senha === undefined || validado.senha === null || validado.senha <= 6 || regex.senha.test(validado.senha) ) {
    erros.push({error: "Senha inválida! A senha deve ter no minimo 6 caracteres."});
  };

  if(!validado.tipoConta || validado.tipoConta === undefined || validado.tipoConta === null) {
    erros.push({error: "Email ou Celular não inserido."});
  };
  /* FINAL DAS VALIDAÇÕES */ 

  return erros?.length > 0 ? erros : validado;   
};

export default validarUser;