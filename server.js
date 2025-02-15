const express = require('express');
const fastify = require('fastify')();
const Koa = require('koa');
const Biscuit = require('biscuitsjar');


// إعداد Biscuits
const appBiscuits = new Biscuit();
appBiscuits.get('/', (req, res) => res.json({ message: 'Hello from Biscuits' }));
Biscuit.defaults(appBiscuits)

appBiscuits.listen(3004, () => console.log('Biscuits running on port 3004'));

// إعداد Express
const appExpress = express();
appExpress.get('/', (req, res) => res.send('Hello from Express'));
appExpress.listen(3001, () => console.log('Express running on port 3001'));

// إعداد Fastify
fastify.get('/', async (request, reply) => {
  reply.send('Hello from Fastify');
});
fastify.listen({ port: 3002 }, () => console.log('Fastify running on port 3002'));

// إعداد Koa
const appKoa = new Koa();
appKoa.use(async (ctx) => {
  ctx.body = 'Hello from Koa';
});
appKoa.listen(3003, () => console.log('Koa running on port 3003'));
