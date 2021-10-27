import { connectToDatabase } from '../../lib/mongodb';
import { ObjectID } from 'mongodb';

export default async (req, res) => {
  const { userId } = req.query;
  if (userId) {
    try {
      const { db } = await connectToDatabase();
      const data = await db
        .collection('order')
        .aggregate([
          {
            $match: {
              user: ObjectID(userId),
            },
          },
          {
            $sort: {
              purchaseTime: -1,
            },
          },
          {
            $set: {
              'purchaseTime.year': { $year: '$purchaseTime' },
              'purchaseTime.month': { $month: '$purchaseTime' },
              'purchaseTime.day': { $dayOfMonth: '$purchaseTime' },
              'purchaseTime.hour': { $hour: '$purchaseTime' },
              'purchaseTime.minutes': { $minute: '$purchaseTime' },
            },
          },
          {
            $project: {
              _id: 0,
              user: 0,
              email: 0,
              'products._id': 0,
              'products.description': 0,
            },
          },
        ])
        .toArray();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).send('Server Error');
    }
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
};
