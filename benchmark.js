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
    duration: 10, // المدة بالثواني
    method: 'GET', // نوع الطلب
    path: '/', // المسار الذي سيتم اختباره
    rate: 10, // عدد الطلبات في الثانية
  });

  console.log(`Results for ${server.name}:`);
  console.log(result);
}


(async () => {
  for (const server of servers) {
    await runBenchmark(server);
  }
})();
