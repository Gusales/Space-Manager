# Space-Manager-Tcc
Este é o Sistema Space Manager, um gerenciador de espaços online cujo o foco principal é facilitar a organização dos espaços escolares, onde cada professor que queira agendar um dia ou horário para dar aula em um espaço que não seja uma sala de aula possa realizar essa programação.

Nossa equipe é formada por:
1. André Almeida;
2. Brendha Cristina;
3. Gerson Silva;
4. Gustavo Sales;
5. Valdir Machado.

Instruções para utilização do sistema:
1. Ter um servidor de banco de dados local, por exemplo: xampp;
2. Possuir o node-js instalado em sua máquina pessoal (https://nodejs.org/pt-br/download/);
3. Fazer upload do arquivo de banco de dados "smdb.sql" (localizado em: "/client/lib/database"), utilizando o phpmyadmin do servidor de banco de dados local;
4. Após a instalação desses programas, abra o projeto em um prompt de comando e digite os seguintes comandos:
 -> cd api;
 -> npm install;
 -> npm run:start:dev;
5. Com a api node funcionando, acesse o arquivo index.html (localizado em: "/client"). 

Para ter acesso ao sistema, basta fazer login com o seguinte RM e SENHA:
rm: 0;
senha: 12345.

Com isso, você será redirecionado ao sistema de administrador do Space Manager.
Aviso: Caso queira alterar essa senha, será necessário cadastrar um novo usuário "Administrador" com rm e senha que queira.