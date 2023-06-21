'use strict';

export default class Middleware {

    static async autorizacao (req, res, next) { 
        if(req.session.user !== undefined){
            next();
        }else{
            res.redirect("/");
        };
    };

    static async jaEstaAutenticado (req, res, next) {
        if(req.session.user) {
            res.redirect("/home");
        }else{
            next();
        };
     };
    
};