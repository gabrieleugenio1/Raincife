'use strict';

import { Given, Then } from '@cucumber/cucumber';
import * as chai from 'chai';
import supertest from 'supertest';
import app from '../../index.mjs'; 

const expect = chai.expect;
const request = supertest(app);

Given('que eu acesse a rota {string} com dados válidos', async function (route) {
  let response;
  switch (route) {
    case '/criar-conta':
      response = await request.post(route).send({
        nome: 'Test User',
        emailCel: 'test@example.com',
        senha: 'password123',
        dataNascimento: '1990-01-01',
        localizacao: 'morro1',
      });
      break;
    case '/login':
      response = await request.post(route).send({
        emailCel: 'test@example.com',
        senha: 'password123'
      });
      break;
    case '/envio-link':
      response = await request.post(route).send({
        email: 'test@example.com'
      });
      break;
    case '/criar-nova-senha':
      response = await request.post(route).send({
        senhaUm: 'newpassword123',
        senhaDois: 'newpassword123',
        CodigoHidden: 'valid-code',
        emailQuery: 'test@example.com'
      });
      break;
    case `/admin/alterar-user/1`:
      response = await request.post(route).send({
        id: this.userId,
        nome: 'Updated User',
        email: 'updated@example.com',
        tipo: 'comum'
      })
      break;
    case `/admin/delete-user/1`:
      response = await request.post(route);
      break;
  }
  
  this.response = response;
});

Then('eu devo ser redirecionado para {string} com uma mensagem de sucesso', function (expectedUrl) {
  const statusCode = this.response.status;
  const locationHeader = this.response.headers.location;

  expect(statusCode, 302);
  expect(locationHeader, expectedUrl);
});