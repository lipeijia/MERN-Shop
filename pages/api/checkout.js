import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';
import { connectToDatabase } from '../../lib/mongodb';
import withSession from '../../lib/section';
import calculateCartTotal from '../../helper/calculateCartTotal';
import { ObjectID } from 'mongodb';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default withSession(async (req, res) => {
  const { paymentData } = req.body;
  try {
    // 1) Verify and get user id from token
    const user = req.session.get('user');
    // 2) Find cart based on user id
    const { db } = await connectToDatabase();
    const cart = await db
      .collection('cart')
      .aggregate([
        {
          $match: {
            user: ObjectID(user._id),
          },
        },
        {
          $unwind: {
            path: '$products',
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'products.product_id',
            foreignField: '_id',
            as: 'product_info',
          },
        },
        {
          $unwind: {
            path: '$product_info',
          },
        },
        {
          $addFields: {
            'product_info.quantity': '$products.quantity',
          },
        },
        {
          $replaceRoot: {
            newRoot: '$product_info',
          },
        },
      ])
      .toArray();
    // 3) Calculate cart totals again from cart products
    const { cartTotal, stripeTotal } = calculateCartTotal(cart);
    // 4) Get email from payment data, see if email linked with existing Stripe customer
    const prevCustomer = await stripe.customers.list({
      email: paymentData.email,
      limit: 1,
    });
    const isExistingCustomer = prevCustomer.data.length > 0;
    // 5) If not existing customer, create them based on their email
    let newCustomer;
    if (!isExistingCustomer) {
      newCustomer = await stripe.customers.create({
        email: paymentData.email,
        source: paymentData.id,
      });
    }
    const customer =
      (isExistingCustomer && prevCustomer.data[0].id) || newCustomer.id;
    // 6)Create charge with, total, send receipt email
    const charge = await stripe.charges.create(
      {
        currency: 'USD',
        amount: stripeTotal,
        receipt_email: paymentData.email,
        customer: customer,
        description: `Checkout | ${paymentData.email} | ${paymentData.id}`,
      },
      { idempotencyKey: uuidv4() }
    );
    // 7) Add order data to database
    let newOrder = {
      user: ObjectID(user._id),
      email: paymentData.email,
      total: cartTotal,
      products: cart,
      purchaseTime: new Date(),
    };
    await db.collection('order').insertOne({ ...newOrder });
    // 8) Clear products in cart
    await db.collection('cart').findOneAndUpdate(
      { user: ObjectID(user._id) },
      {
        $set: {
          products: [],
        },
      },
      { new: true }
    );
    // 9) Send back success (200) response
    res.status(200).send('Checkout Success');
  } catch (error) {
    res.status(500).send('Error Charge Processing.');
  }
});
