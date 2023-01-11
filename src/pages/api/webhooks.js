import Stripe from 'stripe';
import { buffer } from 'micro';
import Cors from 'micro-cors';

const stripe = new Stripe("sk_test_51M6x0oLyEBFmpvhwhO5OLjuHetzgBGjBZre9dnibPasYwFVPy3O9BAfKBXFlx5z66wO2m6KHDj9nWt4j530HA9EJ00QdWefElq");

const webhookSecret = "we_1MBagpLyEBFmpvhw5oiTn6za";

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

const webhookHandler = async (req, res) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const signature = req.headers['stripe-signature'];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        signature,
        webhookSecret
      );
    } catch (err) {
      // On error, log and return the error message.
     
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Successfully constructed event.
   

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
       
        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
       
          `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
        );
        break;
      }
      case 'charge.succeeded': {
        const charge = event.data.object;
       
        break;
      }
      default: {
        console.warn(`Unhandled event type: ${event.type}`);
        break;
      }
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default cors(webhookHandler);