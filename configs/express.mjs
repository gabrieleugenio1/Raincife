'use strict';
//Conectando com o banco
import { Conn }  from '../db/Conn.mjs';
import routes from '../routes/index.mjs';
import flash from "connect-flash";
import session from "express-session";
import MongoStore from 'connect-mongo'
import options from '../db/Mongodb.mjs';

function configExpress(express, app) {

  //Configurando express
  app.set("view engine", "ejs");
  app.use(express.static("public"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(flash());
  Conn.authenticate();

  //Session
  app.use(session({
    secret:process.env.SECRET_SESSION,
    resave:false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    },
    saveUninitialized:true,  
    store: options.mongoUrl ? MongoStore.create(options) : new session.MemoryStore(),
  }));

  //Rotas
  routes(app);

  //Página não encontrada: 404
  app.get('*', (req, res) => {
    res.status(404).json({message:'404'});
  });
};

export default configExpress;
