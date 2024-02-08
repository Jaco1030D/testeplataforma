const stripe = require("stripe")('sk_test_51Obph4JGY6R57eKc0KMCfcVngKRkHV6HIufvenlVl8NcCpaQFZu0LKuvyTVduPSO4I2sWdv4QzSjdC4MHsrDY6S200Ivs2LLnS');
// const stripe = require("stripe")('sk_test_51OF205HR5yfE4YaFBUT1a4yatFHaX5PYhlFa4mpqRSadaqYngNuWDm9lBqQSgTykKZx519Xb4fMcFn1dZthlKgrK00AwSyXZQx'); //minha



exports.handler = async (event) => {
    const  body  = JSON.parse(event.body);

    console.log(body.value);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: parseInt(body.value * 100),
            currency: "eur",
            automatic_payment_methods: {
              enabled: true,
            },
          });
    
          console.log(paymentIntent);
          return {
            statusCode: 200,
            body: JSON.stringify({ clientSecret: paymentIntent.client_secret, id_payment: paymentIntent.id, status: paymentIntent.status }),
          };
    } catch (error) {
        console.log(error);
    }

}

