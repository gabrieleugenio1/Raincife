'use strict';
import { genSaltSync, hashSync } from 'bcrypt';

export default class GetController {

    static async index (req, res) {
        return res.status(200).render("index", { title: "Raincife"});     
    };

    static async cadastro (req, res) {
        return res.status(200).render("telaCadastro", { title: "Raincife"});     
    };
    
    static async login (req, res) {
        return res.status(200).render("telaLogin", { title: "Raincife"});     
    };

    static async home (req, res) {
        return res.status(200).render("telaHome", { title: "Raincife"});     
    };

};