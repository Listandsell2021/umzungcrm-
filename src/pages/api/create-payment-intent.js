// This is your test secret API key.
const stripe = require("stripe")("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");

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
 var p=(parseFloat(items)*100)
  return String(p);
};

export default async function handler(req, res) {
    console.log(req.body)
  var items = JSON.parse(req.body);

  // Create a PaymentIntent with the order amount and currency
  
   

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
       enabled: true,
       },
  });
// automatic_payment_methods: {
    //   enabled: true,
    // },
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};