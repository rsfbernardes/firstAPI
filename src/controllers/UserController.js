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

    response.send(200, sortedUsers);
  },

  getUserById(request, response) {
    const { id } = request.params;

    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      return response.send(404, { error : 'User not found'});
    }
    
      response.send(200, user);
  },

  createUser(request, response) {
    let body = ' ';

    request.on('data', (chunk) => {
      body += chunk;
    });

    request.on('end', () => {
      body = JSON.parse(body);

      const { id } = request.params;

      const lastUserId = users[users.length - 1].id;

      const newUser = {
        id: lastUserId + 1,
        name: body.name
      };

      users.push(newUser);

      response.send(201, newUser);
    })
  }
};