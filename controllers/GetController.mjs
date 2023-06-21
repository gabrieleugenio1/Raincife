'use strict';

export default class GetController {

    static async index (req, res) {
        return res.status(200).render("index", { title: "Raincife", sucess: req.flash("sucess"), erros: req.flash("erros")});     
    };

    static async cadastro (req, res) {
        return res.status(200).render("telaCadastro", { title: "Raincife", sucess: req.flash("sucess"), erros: req.flash("erros")});     
    };
    
    static async login (req, res) {
        return res.status(200).render("telaLogin", { title: "Raincife", sucess: req.flash("sucess"), erros: req.flash("erros")});     
    };

    static async home (req, res) {
        console.log(req.session.user)
        return res.status(200).render("telaHome", { title: "Home", user: req.session.user});     
    };

    static async logout (req, res)  {
        req.session.destroy((err) => {
            if (err) {
              console.error('Erro ao destruir a sessão:', err);
            } else {
              // A sessão foi destruída
              return res.status(200).redirect('/')
            };
        });
    };

};