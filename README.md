# Biscuits benchmark
## Find the benchmark test in owr GitHub repository Download it or git it in your machine and try your self
### mark sure you install all dep
```
npm install biscuitsjar
npm install express 
npm install koa
npm install fastify

npm install autocannon
```
## Run the test
```
node server
node benchmark
```
# the server code 
you can add another framework if you want 
```javascript
const express = require('express');
const fastify = require('fastify')();
const Koa = require('koa');
const Biscuit = require('biscuitsjar');

// إعداد Biscuits
const appBiscuits = new Biscuit();
appBiscuits.get('/', (req, res) => res.json({ message: 'Hello from Biscuits' }));

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
```
## benchmark code
you can add different test to try 
control the
```javascript
const autocannon = require('autocannon');

const servers = [
  { name: 'Express', url: 'http://localhost:3001' },
  { name: 'Fastify', url: 'http://localhost:3002' },
  { name: 'Koa', url: 'http://localhost:3003' },
  { name: 'Biscuit', url: 'http://localhost:3004' },
];

async function runBenchmark(server) {
  console.log(`Running benchmark for ${server.name}...`);

  const result = await autocannon({
    url: server.url,
    connections: 100, // عدد الاتصالات المتزامنة
    //async connections 
    duration: 10, // المدة بالثواني
    // time of the test
    method: 'GET', // نوع الطلب
    // type of the req 
    path: '/', // المسار الذي سيتم اختباره
    // the path 
    rate: 10, // عدد الطلبات في الثانية
    // the rate req/s
  });

  console.log(`Results for ${server.name}:`);
  console.log(result);
}


(async () => {
  for (const server of servers) {
    await runBenchmark(server);
  }
})();

```
# License

Biscuit is released under the MIT License.



---
