const express = require('express');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Gives the page the public key it needs to load Stripe
app.get('/config', (req, res) => {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

// Creates a $20 payment and returns its secret to the page
app.post('/create-payment-intent', async (req, res) => {
  try {
    const pi = await stripe.paymentIntents.create({
      amount: 2000, // cents
      currency: 'usd',
    });
    res.json({ clientSecret: pi.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/health', (req, res) => res.send('ok'));

app.listen(3000, '127.0.0.1', () => console.log('Listening on 3000'));
