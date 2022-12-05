import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useRouter } from 'next/router';
import CheckoutForm from "../component/Checkoutform";
import AES from 'crypto-js/aes';
import { enc } from 'crypto-js';
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_live_AYELWMhv1iDbNo9sOjuQLznC00DUp8jtVV");
import useCheckoutSubmit from '@hooks/useCheckoutSubmit';
export default function App() {
  const [clientSecret, setClientSecret] = React.useState("");
  
  const router = useRouter();
  const {
    dataa,
    setdataa,
    handleSubmit,
    submitHandler,
    handleShippingCost,
    register,
    errors,
    size,
    setSize,
    showCard,
    setShowCard,
    error,
    stripe,
    couponInfo,
    couponRef,
    pincodeRef,
    deliveryRef,
    dlRef,
    liferRef,
    placeid,
    handleCouponCode,
    handleAddress,
    discountAmount,
    shippingCost,
    total,
    isEmpty,
    items,
    cartTotal,
    isCheckoutSubmit,
    setAddressCode,
    addressCode,
    ninetax,
    seventytax,
    setaddressauto,
    setcoup,
    coup,
    getad,
    newsetaddr,
    setvalueinput,
    paypalexpress
  } = useCheckoutSubmit();
  const crypt = (salt, text) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
  
    return text
      .split("")
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join("");
  };
  const decrypt = (salt, encoded) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
    return encoded
      .match(/.{1,2}/g)
      .map((hex) => parseInt(hex, 16))
      .map(applySaltToChar)
      .map((charCode) => String.fromCharCode(charCode))
      .join("");
  };

  var regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while ((match = regex.exec(router.asPath))) {
      params[match[1]] = match[2];
    }
   // console.log(params.paymentId);
    var totals = params.tokenn;
    console.log(totals)
    const decrypted_string = decrypt("salt",String(totals));


  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (Object.keys(router.components).length == 2) {
      //console.log("Is fullpage refresh");
      ///router.push('/');
    } else {
     // console.log("Is is route change");
    }
  
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(decrypted_string),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
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
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm price={decrypted_string} />
        </Elements>
      )}
   
    </div>
  );
}