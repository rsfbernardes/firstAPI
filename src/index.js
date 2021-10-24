const http = require('http');
const routes = require('./routes');

const server = http.createServer((request, response) => {
  console.log(`Request method: ${request.method} | Endpoint: ${request.url}`);

  const route = routes.find((routeObj) => (
    routeObj.method === request.method && routeObj.endpoint === request.url
  ));

  if (route) {
    route.handler(request, response);  
  }
  else {
    response.writeHead(400, { 'Content-Type': 'text/html' });
    response.end(`Cannot ${request.method} ${request.url}`);
  }
});

server.listen(3000, () => console.log('🔛 Server started at http://localhost:3000'));