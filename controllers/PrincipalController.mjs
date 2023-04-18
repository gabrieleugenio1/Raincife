'use strict';
import { genSaltSync, hashSync } from 'bcrypt';

export default class PrincipalController {

    static async home (req, res) {
        return res.status(200).render("index", { title: "Raincife"});     
    };

};