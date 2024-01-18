const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'email-ssl.com.br',
    secureConnection : true,
    port: 465,
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
              subject: 'Bem vindo a magma translatio',
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
          subject: 'Produto comprado com sucesso',
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
                  <p>Seu pedido foi pago com sucesso ja estamos trabalhando na tradução, assim que ficar pronto avisamos por aqui</p>
                  <p>Atenciosamente,<br>Magma Translation</p>
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

      // console.log(mailOptions);

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('E-mail enviado: ' + info.response);
      })

      return {
        statusCode: 200,
        body: JSON.stringify({operation: 'succes'})
      };

    } catch (error) {

      console.log(error);

      return {
        statusCode: 500
      }
    
    }
}