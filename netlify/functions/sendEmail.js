const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'email-ssl.com.br',
    secure: false,
    port: 587,
    auth: {
      user: 'tech@magmatranslation.com', // Seu endereço de e-mail trial
      pass: 'cvSp$48Z!cRZk8B' // Sua senha de e-mail moAoqdeR8780
    }
  });

  const generateHTML = (name, email, order = null, fromUser = true, finalized = false) => {

      let options = {}
      
      if (order === null) {
          console.log('login');
            options = {
              subject: 'Bem vindo a magma translation',
                html: `
                <html>
                  <head>
                    <style>
                      body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        color: #333;
                      }
                      .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                      }
                    </style>
                  </head>
                  <body>
                    <div class="container">
                      <h2>Obrigado por se cadastrar!</h2>
                      <p>Olá ${name},</p>
                      <p>Obrigado por se cadastrar em nosso serviço de tradução. Estamos empolgados em tê-lo(a) conosco! Agora você pode aproveitar as vantagens de tradução de qualidade para seus arquivos.</p>
                      <p>Se precisar de qualquer assistência ou tiver dúvidas, sinta-se à vontade para entrar em contato conosco.</p>
                      <p>Atenciosamente,<br>Magma Translation</p>
                    </div>
                  </body>
                </html>
              `
            }
      } else if (fromUser && finalized) {
          console.log('entregue');
          options = {
            subject: 'Arquivos ja traduzidos',
              html: `
              <html>
                <head>
                  <style>
                    body {
                      font-family: Arial, sans-serif;
                      background-color: #f4f4f4;
                      color: #333;
                    }
                    .container {
                      max-width: 600px;
                      margin: 0 auto;
                      padding: 20px;
                      background-color: #fff;
                      border-radius: 5px;
                      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <h2>Pedido finalizado!</h2>
                    <p>Olá ${name},</p>
                    <p>Seu pedido ${order.numOrder} foi finalizado, você ja pode baixar seus arquivos traduzidos no site</p>
                    <p>Atenciosamente,<br>Magma Translation</p>
                  </div>
                </body>
              </html>
            `
          }
      } else if (fromUser) { // sera enviado ao usuario quando o usuario finalizar compra
        options = {
          subject: 'Pedido recebido e pago com sucesso',
            html: `
            <html>
              <head>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                  }
                  .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  }
                </style>
              </head>
              <body>
                <div class="container">
                <h2>Confirmação de Pedido</h2>
                
                <p>Olá ${name},</p>
                
                <p>Obrigado por escolher nossos serviços de tradução. Abaixo estão os detalhes do seu pedido:</p>
                
                <strong>Dados do Pedido:</strong>
                <ul>
                    <li><strong>Arquivo:</strong> ${order.name}</li>
                    <li><strong>Tipo de Arquivo:</strong> ${order.archiveType}</li>
                    <li><strong>Idioma de Origem:</strong> ${order.languageSetings.origin}</li>
                    <li><strong>Idiomas para Tradução:</strong> ${order.languageSetings.translation.join(', ')}</li>
                    <li><strong>Plano Escolhido:</strong> ${order.TypeService}</li>
                    <li><strong>Número de Palavras:</strong> ${order.numWords}</li>
                    <li><strong>Número de Páginas:</strong> ${order.numPages}</li>
                    <li><strong>Prazo de Entrega:</strong> ${order.finalDate}h</li>
                    <li><strong>Valor Total:</strong> ${order.value}</li>
                </ul>
                
                <p>Seu pagamento foi confirmado com sucesso, e seu pedido está em processamento. Em breve, você receberá a tradução concluída.</p>
                
                <p>Obrigado novamente por escolher nossos serviços. Se você tiver alguma dúvida ou precisar de mais informações, sinta-se à vontade para entrar em contato conosco.</p>
                
                <p>Atenciosamente,<br>
                Magma translation</p>
                </div>
              </body>
            </html>
          `
        }
      } else if (fromUser === false) {
        options = {
          subject: 'Um usuario fez um novo pedido',
          to: 'jacomercadopago@gmail.com',
            html: `
            <html>
              <head>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                  }
                  .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <h2>O usuario: ${name} fez um pedido de tradução</h2>
                  <p>o numero da ordem é ${order.numOrder}</p>
                  <p>Atenciosamente,<br>Magma Translation</p>
                </div>
              </body>
            </html>
          `
        }
      } 

    return options
  }

  
 
exports.handler = async (event) => {
    try {
      const  body  = JSON.parse(event.body);

      const html = generateHTML(body.name, body.email, body.order, body.fromUser, body.finalized)

      const mailOptions = {
        from: 'tech@magmatranslation.com', 
        to: body.email, 
        ...html
      };

      console.log('chegou aqui');

      const result = await transporter.sendMail(mailOptions)

      console.log(result);
      return {
        statusCode: 200,
        body: JSON.stringify({operation: 'succes'})
      };

    } catch (error) {

      console.log(error);

      return {
        statusCode: 500,
        body: JSON.stringify({error})
      }
    
    }
}