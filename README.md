# firstAPI
Criando uma API REST com um CRUD em nodeJS puro, como parte do estudo do curso JStack.

Utilizado mock de dados, com a entidade Users, para simular os objetos em memória.

Implementado as funções e funcionalidades:

 - listUsers: retorna todos os usuários, com opção de uma query de ordenação descrescente;
 
 - getUserById: retorna o usuário solicitado, ou mensagem de erro caso o id do usuário não exista;
 
 - createUser: insere um usuário na entidade Users;
 
 - updateUser: alterad o nome de um usuário ou retorna mensagem caso o id do usuário não exista;
 
 - deleteUser: excluir o usuário ou retorna mensagem de erro caso o id do usuário não exista.
