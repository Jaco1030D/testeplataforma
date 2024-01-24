// This is your test secret API key.
const stripe = require("stripe")('sk_test_51Obph4JGY6R57eKc0KMCfcVngKRkHV6HIufvenlVl8NcCpaQFZu0LKuvyTVduPSO4I2sWdv4QzSjdC4MHsrDY6S200Ivs2LLnS');

const calculateOrderAmount = (items) => {
  return 1400;
};

exports.handler = async (event) => {
    const  body  = JSON.parse(event.body);

    console.log(body.value);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: body.value * 100,
            currency: "eur",
            automatic_payment_methods: {
              enabled: true,
            },
          });
    
          return {
            statusCode: 200,
            body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
          };
    } catch (error) {
        console.log(error);
    }

}

