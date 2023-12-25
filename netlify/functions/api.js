const stripe = require("stripe")('sk_test_51OF205HR5yfE4YaFBUT1a4yatFHaX5PYhlFa4mpqRSadaqYngNuWDm9lBqQSgTykKZx519Xb4fMcFn1dZthlKgrK00AwSyXZQx');

exports.handler = async (event, context) => {
  try {
    const  body  = JSON.parse(event.body);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: body.items.map((item) => {
        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Tradução do arquivo ${item.name}`,
              description: `Tradução do arquivo ${item.name} de ${item.origin} para ${item.translation}. 
              ${item.numWords} palavras, ${item.numPages} paginas, prazo de entrega ${item.deadlines}.`
            },
            unit_amount: item.value,
          },
          quantity: item.quantity,
        };
      }),
      customer_email: body.email,
      success_url: `https://glowing-profiterole-535857.netlify.app/order`,
      cancel_url: `https://glowing-profiterole-535857.netlify.app/order`,
    });

    // const testamento = await stripe.checkout.sessions.retrieve('cs_test_a12yfvIPc1sDgk3UoFxCDX0flp3homtCX0IET8qVUl5SWAH2KxpBm77Yt2')
    // const paymentIntent = await stripe.paymentIntents.retrieve(testamento.payment_intent);
    // console.log(testamento, paymentIntent);
    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id, url: session.url, status: session.status, paymentStatus: session.payment_status }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
