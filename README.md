# Benchmark
As we say we believe in try not to see 
Download the Code or use git and run it into your own machine to see by your self we have but the code in way to be easy to run it and change it you can control it the main key's are
  - duration = 10 it's been set to 10
  - connections = 100
  - rate = 10
  - you can change that to see your self 

"These results are obtained after optimizing, so if you use Biscuit without the default app configuration, the results will likely be different, probably lower than this. Additionally, results may vary from machine to machine, so you may see different results."

```
Biscuit.defaults(app)

```
| الإطار       | المحاولة | عدد الطلبات | معدل الاستجابة (ms) | معدل الإنتاجية (req/s) | الأخطاء |
|--------------|-----------|--------------|----------------------|-------------------------|---------|
| **Express**  | الأولى    | 2585         | 386.16               | 258.5                  | 0       |
|              | الثانية   | 3695         | 269.4                | 369.5                  | 0       |
| **Fastify**  | الأولى    | 6287         | 159.8                | 628.71                 | 0       |
|              | الثانية   | 10854        | 92.9                 | 1085.41                | 0       |
| **Koa**      | الأولى    | 7328         | 136.88               | 732.8                  | 0       |
|              | الثانية   | 8345         | 119.81               | 834.5                  | 0       |
| **Biscuit**  | الأولى    | 8340         | 120.23               | 834                    | 0       |
|              | الثانية   | 11033        | 99.79                | 1003                   | 0       |

# English
| Framework   | Attempt   | Total Requests | Avg Latency (ms) | Avg Throughput (req/s) | Errors |
|-------------|-----------|----------------|------------------|------------------------|--------|
| **Express** | First     | 2585           | 386.16           | 258.5                 | 0      |
|             | Second    | 3695           | 269.4            | 369.5                 | 0      |
| **Fastify** | First     | 6287           | 159.8            | 628.71                | 0      |
|             | Second    | 10854          | 92.9             | 1085.41               | 0      |
| **Koa**     | First     | 7328           | 136.88           | 732.8                 | 0      |
|             | Second    | 8345           | 119.81           | 834.5                 | 0      |
| **Biscuit** | First     | 8340           | 120.23           | 834                   | 0      |
|             | Second    | 11033          | 99.79            | 1003                  | 0      |

# Find the benchmark test in own GitHub repository Download it or git it in your machine and try your self

### Yes, Biscuit has provided good performance in some cases, even outperforming Fastify on occasion. However, Fastify still maintains its performance advantage in all cases.

### Biscuit was built primarily to provide a fast and lightweight alternative with ease of use. You can literally learn Biscuit in 10 minutes if you have prior experience with Express.


### mark sure you install all dep

[Biscuits benchmark repository](https://github.com/Moham3dabdalla/Biscuit-benchmark)

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
control the test
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
