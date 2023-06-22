'use strict';

export default class GetController {

    static async index (req, res) {
        return res.status(200).render("index", { title: "Raincife", success: req.flash("success"), erros: req.flash("erros")});     
    };

    static async cadastro (req, res) {
        return res.status(200).render("telaCadastro", { title: "Raincife - Cadastro", success: req.flash("success"), erros: req.flash("erros")});     
    };
    
    static async login (req, res) {
        return res.status(200).render("telaLogin", { title: "Raincife - Login", success: req.flash("success"), erros: req.flash("erros")});     
    };

    static async home (req, res) {
        console.log(req.session.user)
        return res.status(200).render("telaHome", { title: "Raincife - Home", user: req.session.user});     
    };

    static async esqueceuSenha (req, res) {
        const codigo = req.query['codigo'];
        const email = req.query['email'];
        return res.status(200).render("telaEsqueciSenha", { title: "Raincife - Esqueceu a senha?", codigo: codigo, email: email, success: req.flash("success"), erros: req.flash("erros")});     
    };

    static async logout (req, res)  {
        req.session.destroy((err) => {
            if (err) {
              console.error('Erro ao destruir a sessão:', err);
            } else {
              return res.status(200).redirect('/')
            };
        });
    };

};