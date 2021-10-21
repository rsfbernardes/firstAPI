const users = require('../mocks/Users');

module.exports = {
  listUsers(request, response) {
    const { order } = request.query;

    const sortedUsers = users.sort((a, b) => {

      if (order === 'desc') {
        return a.id < b.id ? 1 : -1;
      }
      else {
        return a.id > b.id ? 1 : -1;
      };
    });

    response.send(200, sortedUsers);
  },

  getUserById(request, response) {
    const { id } = request.params;

    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      response.send(400, `User not found`);
    }
    else {
      response.send(200, user);
    }
  },

  createUser(request, response) {
    const { body } = request;
    // const { order } = request.query;

    // const sortedUsers = users.sort((a, b) => {

    //   if (order === 'desc') {
    //     return a.id < b.id ? 1 : -1;
    //   }
    //   else {
    //     return a.id > b.id ? 1 : -1;
    //   };
    // });

    // const lastUserId = sortedUsers[sortedUsers.length - 1].id;
    const lastUserId = users[users.length - 1].id;

    const newUser = {
      id: lastUserId + 1,
      name: body.name
    }
    users.push(newUser);

    response.send(201, newUser)
  }
}