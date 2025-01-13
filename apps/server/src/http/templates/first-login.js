export const firstLoginHtml = (name, redirectUrl) => `
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <title>Space Manager | Primeiro Login na plataforma</title>
    <style>

      h1 {
        font-size: 24px;
        color: #fff;
      }
    
      p, a {
        font-size: 18px;
      }

      p {
        margin-top: 8px
      }
      
      .header{
        background-color: #e01313;
        padding: 0.5rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

    </style>
  </head>
  <body>
      <div class="header">
        <h1>Primeiro login na Plataforma</h1>
      </div>
      <p>Olá ${name}!</p>
      <p>
        Verificamos que esse é o seu primeiro acesso a plataforma Space Manager, e por isso gostariamos de reforçar que ao ser cadastrado no sistema, 
        sua senha de usuário foi gerada automaticamente e, portanto ressaltamos que realize a troca da senha para alguma que seja de vosso agrado.
        Basta acessar <a href="${redirectUrl}">nosso site</a> para realizar a mudança.
      </p>
      <p>Agradecemos por utilizar nossos serviços</p>
      <p>Atenciosamente, <br /> <b>Equipe Space Manager</b> </p>
    </div>
  </body>
</html>
`