import { connectToDatabase } from '../../lib/mongodb';
import withSession from '../../lib/section';
import { ObjectID } from 'mongodb';

export default withSession(async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res);
      break;
    case 'PUT':
      await handlePutRequest(req, res);
      break;
    case 'DELETE': {
      await handleDeleteRequest(req, res);
      break;
    }
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
  }
});

async function handleGetRequest(req, res) {
  const user = req.session.get('user');
  if (user) {
    const { db } = await connectToDatabase();
    const data = await db
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

    const newData = { cart: data, isLoggedIn: user.isLoggedIn };
    res.status(200).json(newData);
  } else {
    res.json({
      isLoggedIn: false,
      cart: [],
    });
  }
}

async function handlePutRequest(req, res) {
  const user = req.session.get('user');
  if (user) {
    const { quantity, _id } = req.body;
    const { db } = await connectToDatabase();
    const cartDB = await db.collection('cart');
    // Get user cart based on userId
    const hasProduct = await cartDB.findOne({
      user: ObjectID(user._id),
      'products.product_id': ObjectID(_id),
    });
    // Check if product already exists in cart
    if (hasProduct) {
      // If so, increment quantity (by number provided to the request)
      await cartDB.findOneAndUpdate(
        { user: ObjectID(user._id), 'products.product_id': ObjectID(_id) },
        {
          $inc: {
            'products.$.quantity': quantity,
          },
        }
      );
    } else {
      // If not, add product and quantity to cart.
      await cartDB.findOneAndUpdate(
        { user: ObjectID(user._id) },
        {
          $addToSet: {
            products: { product_id: ObjectID(_id), quantity },
          },
        }
      );
    }
    res.status(200).send('Cart Update');
  } else {
    res.json({
      isLoggedIn: false,
      cart: [],
    });
  }
}

async function handleDeleteRequest(req, res) {
  const user = req.session.get('user');
  if (user) {
    const { productId } = req.body;
    const { db } = await connectToDatabase();
    const cartDB = await db.collection('cart');
    const data = await cartDB.findOneAndUpdate(
      { user: ObjectID(user._id) },
      { $pull: { products: { product_id: ObjectID(productId) } } },
      { new: true }
    );
    const newData = {
      cart: JSON.parse(JSON.stringify(data)),
      isLoggedIn: user.isLoggedIn,
    };
    res.status(200).json(newData);
  } else {
    res.json({
      isLoggedIn: false,
      cart: [],
    });
  }
}
