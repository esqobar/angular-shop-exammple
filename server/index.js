const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json());
app.use(express.static('public'))
app.use(cors({ origin: true, credentials: true}))

const stripe = require('stripe')('sk_test_5XcR9JjFOL6dx0Y56L82yDCG')

app.post('/checkout', async (req, res, next) => {
  try{
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.product]
          },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:4242/success.html',
      cancel_url: 'http://localhost:4242/cancel.html',
    });

    res.status(200).json(session)
  } catch (error) {
    next(error)
  }
});

app.listen(4242, () => console.log('app is running on port: 4242'));
