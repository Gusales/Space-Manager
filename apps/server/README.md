# Space Manager API (Aplication Programing Interface)

## 📖 Sobre
Essa aplicação é um servidor HTTP que faz a ponte entre o banco de dados com a aplicação web do Space Manager. Ela é responsável por todo o backend, conexão com banco de dados, envio de emails e toda a lógica de programação.

## 🚀 Stack Utilizada

- Javascript
- NodeJS
- Express
- Nodemon
- Jsonwebtoken
- Nodemailer

## 🚀 Setup da aplicação

1. Primeiramente, é necessário possuir o [NodeJS](https://nodejs.org/en/download) instalado na sua máquina, juntamente com o [Xampp](https://www.apachefriends.org/pt_br/index.html) ou [docker](https://hub.docker.com/), nesse tutorial seguiremos com o **Xampp**

2. Com o NodeJS instalado, abra a pasta api e faça a instalação das dependências utilizando o seguinte comando: 
```bash
npm install
```

3. Após a conclusão da instalação das dependências, abra o aplicativo do Xampp e inicialize o módulo do MySQL, responsável pela armazenagem dos dados da aplicação, juntamente com o módulo do Apache, assim teremos uma interface para o MySQL.

4. Abra o [phpMyAdmin](http://localhost/phpmyadmin/), clique sobre o campo SQL, na barra de navegação superior, abaixo de servidor 127.0.0.1.

5. Digite o seguinte comando para criar um banco de dados para o Space Manager: 
```SQL
CREATE DATABASE spacemanager
    DEFAULT CHARACTER SET = 'utf8mb4';
``` 
6. Logo após, crie uma cópia do arquivo *.env.example* para um arquivo *.env* e utilize suas credenciais.

7. Com isso, apenas rode o comando a seguir e seu servidor HTTP estará funcionando perfeitamente!

Em desenvolvimento:
```bash
npm run dev
```

Em produção:
```bash
npm start
```
