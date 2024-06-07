'use strict';

import { Given, Then } from '@cucumber/cucumber';
import * as chai from 'chai';
import supertest from 'supertest';
import app from '../index.mjs'; 

const expect = chai.expect;
const request = supertest(app);

Given('que eu acesse a rota {string}', async function (route) {
  this.response = await request.get(route);
});

Then('eu devo ver o título {string}', function (title) {
  const regex = new RegExp(`<title>${title}</title>`);
  expect(this.response.text).to.match(regex);
});
