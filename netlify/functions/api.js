// const stripe = require("stripe")('sk_test_51Obph4JGY6R57eKc0KMCfcVngKRkHV6HIufvenlVl8NcCpaQFZu0LKuvyTVduPSO4I2sWdv4QzSjdC4MHsrDY6S200Ivs2LLnS');
const stripe = require("stripe")('sk_test_51OF205HR5yfE4YaFBUT1a4yatFHaX5PYhlFa4mpqRSadaqYngNuWDm9lBqQSgTykKZx519Xb4fMcFn1dZthlKgrK00AwSyXZQx'); //minha

exports.handler = async (event, context) => {
  const  body  = JSON.parse(event.body);
  console.log(body.id_payment);
  try {

    const paymentIntent = await stripe.paymentIntents.retrieve(
      body.id_payment
    );

    console.log(paymentIntent);

    // const  body  = JSON.parse(event.body);
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   mode: "payment",
    //   line_items: body.items.map((item) => {
    //     return {
    //       price_data: {
    //         currency: "eur",
    //         product_data: {
    //           name: `Tradução do arquivo ${item.name}`,
    //           description: `Tradução do arquivo ${item.name} de ${item.origin} para ${item.translation}. 
    //           ${item.numWords} palavras, ${item.numPages} paginas, prazo de entrega ${item.deadlines}.`
    //         },
    //         unit_amount: item.value,
    //       },
    //       quantity: item.quantity,
    //     };
    //   }),
    //   customer_email: body.email,
    //   success_url: `https://glowing-profiterole-535857.netlify.app/order`,
    //   cancel_url: `https://glowing-profiterole-535857.netlify.app/order`,
    // });

    // const testamento = await stripe.checkout.sessions.retrieve('cs_test_a12yfvIPc1sDgk3UoFxCDX0flp3homtCX0IET8qVUl5SWAH2KxpBm77Yt2')
    // const paymentIntent = await stripe.paymentIntents.retrieve(testamento.payment_intent);
    // console.log(testamento, paymentIntent);
    return {
      statusCode: 200,
      body: JSON.stringify({ status: paymentIntent.status }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
