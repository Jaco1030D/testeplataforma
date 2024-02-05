import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useMainContext } from "../../context/MainContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useInsertDocuments } from "../../hooks/useInsertDocuments";
import { useParams } from "react-router-dom";
import { useDeleteDocuments } from "../../hooks/useDeleteDocuments";

export default function CheckoutForm({archivesURL, handleClick}) {
  const {deleteDocument} = useDeleteDocuments('archives')
  const {id} = useParams()
  const stripe = useStripe();
  const elements = useElements();
  const [state, actions] = useMainContext()
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let idDoc

    if (!id) {
      const id = await handleClick()

      idDoc = id
      console.log('Id Checkout' + id);
    }
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://app.magmatranslation.com/order",
      },
    });

    console.log(response);

    if (response.error.type === "card_error" || response.error.type === "validation_error") {
      setMessage(response.error.message);
      deleteDocument(idDoc)
    } else {
      setMessage("Tente novamente mais tarde")
      deleteDocument(idDoc)
    }


    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <form className="pay" id="payment-form" onSubmit={handleSubmit}>

      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button className="pay" disabled={isLoading || !stripe || !elements || (!archivesURL && !id)} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}