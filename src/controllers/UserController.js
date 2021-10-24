const users = require('../mocks/Users');

module.exports = {
  listUsers(request, response) {
    const { order } = request.query;

    const sortedUsers = users.slice().sort((a , b) => {
      if (order === 'desc') {
        return a.id < b.id ? 1 : -1;
      }
      else {
        return a.id > b.id ? 1 : -1;
      }
    });

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(sortedUsers));
  },

  getUserById(request, response) {
    const { id } = request.params;

    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error : 'User not found'}));
    }
    else {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(user));
    }
  }
};