const http = require('http');
const routes = require('./routes');
const { URL } = require('url');

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);

  console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);
  console.log(parsedUrl);

  let { pathname } = parsedUrl;

  const route = routes.find((routeObj) => (
    routeObj.method === request.method && routeObj.endpoint === pathname
  ));

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    route.handler(request, response);  
  }
  else {
    response.writeHead(400, { 'Content-Type': 'text/html' });
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }
});

server.listen(3000, () => console.log('🔛 Server started at http://localhost:3000'));