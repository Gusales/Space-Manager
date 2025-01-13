export const createdNewUserTemplate = (name, rm, password) => `
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-Vindo ao Nosso Sistema</title>
</head>
<body>
    <h2 style="color: #e01313;">Bem-Vindo ao Nosso Sistema!</h2>

    <p>Olá ${name},</p>

    <p>Seja muito bem-vindo ao nosso sistema! Estamos empolgados em tê-lo(a) conosco.</p>

    <p>A partir de agora, você terá acesso a todas as funcionalidades incríveis que nossa plataforma oferece (Como os agendamentos de espaço)</p>

    <p>Detalhes de Login:</p>
    <ul>
        <li><strong>RM:</strong> ${rm}</li>
        <li><strong>Senha:</strong> ${password}</li>
    </ul>

    <p>Por motivos de segurança, recomendamos que você altere sua senha assim que possível.</p>

    <p>Se precisar de ajuda ou tiver alguma dúvida, não hesite em entrar em contato conosco.</p>

    <p>Novamente, bem-vindo(a)!</p>

    <p>Atenciosamente,<br>
    Equipe Space Manager</p>

</body>
</html>`