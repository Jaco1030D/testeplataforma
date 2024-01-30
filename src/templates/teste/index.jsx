import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./checkout";
import "./style.css";
import axios from "axios";
import { useMainContext } from "../../context/MainContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useInsertDocuments } from "../../hooks/useInsertDocuments";
import { useParams } from "react-router-dom";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51Obph4JGY6R57eKcvgP1L73hodzcTKxzq0LDU6Y66PePYDEU45h8a3AwfmtskFxLmWxigeNFZboclrixOaznmTjy00pUucHq0Q");
// const stripePromise = loadStripe("pk_test_51OF205HR5yfE4YaF3DfcIVdTvDSgPQcOkpYu7UIVWok5smXOwpTFSvSzvhQ3qHjmolLaCRUB37rtmZOthsnPdmfY00Od0mpp7K"); //minha

export function Teste({value, setDocument, handleClick, archivesURL, setArchivesURL}) {
  const {id} = useParams()
  const [state, actions] = useMainContext()
  const [id_payment, setId_payment] = useState("")
  const [clientSecret, setClientSecret] = useState("")
  const {insertDocument, insertFiles} = useInsertDocuments("archives")
  const {documents: last_order} = useFetchDocuments("archives", null, null, false, true)
  const [status, setStatus] = useState()


  console.log(clientSecret);

  const uploadMultipleArchives = async (files) => {
    const arrayArchive = []

    for (let index = 0; index < files.length; index++) {

        const downloadArchive = await insertFiles(files[index])

        arrayArchive.push({downloadArchive, fileName: files[index].name})
        
    }

    return arrayArchive
  }

  const chamarDados = async () => {

    const response = await axios.post("/.netlify/functions/teste", {
      value: value
    })

    console.log(response);

    return response.data

  }

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (clientSecret) {
      return
    }
    if (id) {
      setClientSecret(id)
    } else {
      chamarDados().then(res =>{
        setClientSecret(res.clientSecret)
        setId_payment(res.id_payment)
        setStatus(res.status)
      })
    }
    
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

  useEffect(() => {
    if (!archivesURL || !last_order || id) {
      return
    }

    if (!id) {
      const cartWithPaymentInfos = {
        ...state.cart,
        paymentInfos: {id_payment, clientSecret, status},
        numOrder: last_order[0]?.numOrder ? last_order[0].numOrder + 1 : 2963,
        finalized: false,
        uid: state?.user?.uid,
        archivesURL,
        user: state.user
      }
      setDocument(cartWithPaymentInfos)
    }


  },[state.cart, id_payment, clientSecret, status, archivesURL, last_order])

  useEffect(() => {
    if (id) {
      return
    }
      uploadMultipleArchives(state.filePending).then(res =>
        setArchivesURL(res)
        )
    },[state.filePending])

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} archivesURL={archivesURL} handleClick={handleClick} />
        </Elements>
      )}
    </div>
  );
}