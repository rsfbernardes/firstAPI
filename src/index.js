const http = require('http');
const routes = require('./routes');
const { URL } = require('url');
const bodyParser = require('./helpers/bodyParser');

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);

  let { pathname } = parsedUrl;
  let id = null;

  const splitPathname = pathname.split('/').filter(Boolean);

  if (splitPathname.length > 1) {
    pathname = `/${splitPathname[0]}/:id`;
    id = splitPathname[1];
  }

  console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);
  console.log(parsedUrl);
  console.log(parsedUrl.searchParams);

  const route = routes.find((routesObj) => (
    routesObj.method === request.method && routesObj.endpoint === pathname
  ));

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { id };

    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(body));
    }

    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      bodyParser(request, () => route.handler(request, response)); 
    }
    else {
      route.handler(request, response);
    }
  }
  else {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
  }
});

server.listen(3000, () => console.log('🔛 Server started at http://localhost:3000'));