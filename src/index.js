const http = require('http');
const routes = require('./routes');
const { URL } = require('url');

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);

  console.log(`Request method: ${request.method} | Endpoint: ${request.url}`);
  console.log(parsedUrl);

  const route = routes.find((routeObj) => (
    routeObj.method === request.method && routeObj.endpoint === request.url
  ));

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    route.handler(request, response);  
  }
  else {
    response.writeHead(400, { 'Content-Type': 'text/html' });
    response.end(`Cannot ${request.method} ${request.url}`);
  }
});

server.listen(3000, () => console.log('🔛 Server started at http://localhost:3000'));