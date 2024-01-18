import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./checkout";
// import "./style.css";
import axios from "axios";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51OF205HR5yfE4YaF3DfcIVdTvDSgPQcOkpYu7UIVWok5smXOwpTFSvSzvhQ3qHjmolLaCRUB37rtmZOthsnPdmfY00Od0mpp7K");

export function Teste() {
  const [clientSecret, setClientSecret] = useState("");
  const chamarDados = async () => {
    const response = await axios.post("/.netlify/functions/teste")

    console.log(response);
    return response.data
  }

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    chamarDados().then(res => setClientSecret(res.clientSecret))
    
  //   fetch("/create-payment-intent", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        // <Elements options={options} >
        //   <CheckoutForm />
        // </Elements>
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}