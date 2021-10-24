function bodyParser(request, callback) {
  let body = ' ';

  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', () => {
    body = JSON.parse(body);
    const { body } = request;
    callback();
  })
};

module.exports = bodyParser;