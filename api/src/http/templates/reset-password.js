export const resetPasswordHtml = (user) => `
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <title>Space Manager | Recuperação de Senha</title>
    <style>
      html,
      body {
        height: 100%;
        background-color: #151515;
      }

      div.header {
        position: fixed;
        top: 0;
        padding: 0.5rem 0;
        
        background-color: #e01313;
        box-shadow: 5px 5px 9px 2px rgba(0, 0, 0, 0.616);
        z-index: 3;

        display: flex;
        align-items: center;
        justify-content: center;
      }

      h1 {
        font-size: 24px;
        text-shadow: 2.8px 2.8px #000000;
        color: rgb(245, 248, 250);
        font-weight: bold;
      }

      div.main {
        box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.05);

        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0 0.5rem;

        color: #ffffff;
      }
      
      a{
        color: #ffffff;
        text-decoration: none;
        background-color: #e01313;
        padding: 0.25rem 0.5rem;
        max-width: fit-content;
        border-radius: 6px;
      }
      
      a:hover{
        text-decoration: underline;
      }

      p, a {
        font-size: 18px;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>Alteração de senha</h1>
    </div>
    <div class="main">
      <p>Caro ${user}</p>,
      <p>Esta é uma notificação para informar que a senha associada à sua conta foi alterada com êxito.</p>
      <p>Se você não realizou essa alteração, por favor, entre em contato conosco o mais rápido possível.</p>
      <p>Agradecemos por utilizar nossos serviços</p>
      <p>Atenciosamente, <br /> <b>Equipe Space Manager</b> </p>
    </div>
  </body>
</html>
`