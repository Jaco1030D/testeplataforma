const admin = require('firebase-admin');
const nodemailer = require('nodemailer')
admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "teste-d64ce",
        "private_key_id": "234e4f2b7ff812b2387afba342175fca9734de9f",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCh5Y29wi+mRSRe\nW0i2HtKEUqg46dzn1Wk7dQN/eu94NrpbeEOgzT/7Js3pomkbzFTR+C/K8PKw2XzI\nKf6V9hZyX2DY92ZyT5jfh2EIsteTi7e8YGk5fQJLKEP4057NB9VhD9m8DJf1CJ+s\n9q8ogqbb/n/aTPdQDlw/GDsP1qEHW0yjHfK95jf6Ltta8stamsMDh1bDOLTjWh1C\nZce6Y4xYOVAnrnzd1d+dJRwvBqPydlouQ7XKmGq2Qh93p1qP1TFCIMdO2TEneVUi\ncLyIpgg/a/x4NJO65VU7qqHYEg+SJHrCZEa7SUHIZrK1TAgAg4PUeuPwoGm74R5C\n18J/3wHtAgMBAAECgf9jn7yZO+WN9A9LEhRoH8Ke3df8HLnkVgiewQ13D5XEUtgW\nYGK0xCF44r1s9rdQ/WwBYslbfwv6+uubL9XxYOQI0sqSuN5AztyIBgr0T12MS7Ir\nOWz+asyHDNm173JAdKKmfjygWUGxmFip46uhUysWeZa8Ayk95w/Lw7b65fYxbZq9\nExMyCohM7DeoGqVrXHUjrhy2XMFyCnmsSyXuyvW+lKGeIF3vnTDMi2/9b1bIBdts\nZ17D2VgEYWirpCwJT0DOIpLNviIRuJvsSyHR6qUu70weCF6gZ6mJwEPzqhX2qtJI\nMaxe8J+BNy9XEmMERrHB2pLwOU8wbhN1h/M16OECgYEA47Pg3FyfRJ8fa/gWEjE1\nHt2SPS5kIPiP/rCi6dhoaarxVrZlHSl4fqaMXSghJ3M6ZrNsXL6BjXwoUzYHLqAs\nnkq2X+8oZ6s+/+JPw45zQOSThlHlrgROoS9prIK9kBkMARtjmIll6vQUISwj8j/X\n+X1AdgkT6dE4Buz6EQQ0WRUCgYEAtgQgrl8HsNLKjtZeV//kYOyj3zM0x11OosWY\nzC5YlnuK90dSENea7M4TUwNP4VULdkaGGwVXXUgy/4ZyRq1wvlTSOaWYg5auqvtG\nzQZcfaG6+JxmlxKbppktqywPNaZ06Tah2ZYvuf5LYYGW0NCaBqg9d1euVOK+AKgV\nCd9ZC3kCgYB3amSo7KJSWKkf9JGOpOPY9ha1o1i7ud+6kGRAA1Bu6kl7Ulig/JjG\nww2l5V/N0q50IfDYishirRRw30rQ9wuvUDtpAIHOLI7zn3p5coGbLMT5koXDx1p9\nSeI/qKlFov0ar4SCALzEhZDw/Lc1Wqonm7psrMIWw7SAXVOgDPZvKQKBgQCcMKKS\nvz1sQRZMyCuhPBcQDUD6EYji43DNQN7Dp6mhSFaRp4QGq91oA9aVT6xGYqI5Vn9R\nxJ2ZkJEisI5zk/XBfiwAB9f+Y1lzo7i3yxOnQxecqyllzjP/HEcSMfbDRRnh3l24\nx6Yg5tRs0bVHbxodSFWmiXkxonkFOzcCh8RzkQKBgQCoOY/3DvJ/27toKwvapduq\nGdt6biY38SsXs+M+GtVctUdQLeun7AS86MnRJ/E4vFC2fXYr1mv0PLjdd+TbHTU2\nXbsO++Lw1e2iAaD7GO9hsvbf4f0LrjKUzu5DBJSdNwVJgvm/9cgaGgKIMRM5FJJd\nbpAR2y3lOCwgjHcPc/VcKg==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-g5olg@teste-d64ce.iam.gserviceaccount.com",
        "client_id": "104659176172768538680",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-g5olg%40teste-d64ce.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
      }),
})
const db = admin.firestore();
const url = 'https://glowing-profiterole-535857.netlify.app'

const transporter = nodemailer.createTransport({
  host: 'email-ssl.com.br',
  secureConnection : true,
  port: 465,
  auth: {
    user: 'tech@magmatranslation.com', // Seu endereço de e-mail trial
    pass: 'cvSp$48Z!cRZk8B' // Sua senha de e-mail moAoqdeR8780
  }
});
const generateToken = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const tokenLength = 20;
  let token = '';

  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }

  return token;
}

exports.handler = async (event, context) => {
    const  body  = JSON.parse(event.body);

    try {
      const token = generateToken()
       const documentResetPass = {
        token,
        email: body.email
       }

       db.collection('resetPasswordToken').add(documentResetPass).then((docRef) => {
        console.log('Documento adicionado com sucesso, ID:', docRef.id);
      })
      .catch((error) => {
        console.error('Erro ao adicionar documento:', error);
      });

      const mailOptions = {
        from: 'tech@magmatranslation.com', 
        to: body.email, 
        subject: 'Alterar sua senha',
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
                  <h2>Faça a alteração da sua senha</h2>
                  <p>${token}</p>
                  <p> <a href="${url}/resetPass/${token}">Alterar sua senha</a> </p>
                  <p>Atenciosamente,<br>Magma Translation</p>
                </div>
              </body>
            </html>
          `
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
            body: JSON.stringify({message: `Um E-mail foi enviado para o email com um link para resetar sua senha`}),
          };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Tente mais tarde' }),
          };
    }
}