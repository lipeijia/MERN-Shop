import { connectToDatabase } from '../../../lib/mongodb';
import { ObjectID } from 'mongodb';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res);
      break;
    case 'POST':
      await handlePostRequest(req, res);
      break;
    case 'DELETE':
      await handleDeleteRequest(req, res);
      break;
  }
};

async function handleGetRequest(req, res) {
  const { pid } = req.query;
  try {
    const { db } = await connectToDatabase();
    const data = await db
      .collection('products')
      .findOne({ _id: ObjectID(pid) });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send('Server Error');
  }
}

async function handlePostRequest(req, res) {
  const { name, price, description, mediaUrl } = req.body;
  try {
    if (!name || !price || !description || !mediaUrl) {
      return res.status(422).send('Product missing one or more fields');
    }
    const { db } = await connectToDatabase();
    const response = await db.collection('products').insertOne(req.body);
    res.json(response);
  } catch (err) {
    res.status(500).send('Error Creating Product');
  }
}

async function handleDeleteRequest(req, res) {
  const { id } = req.body;
  console.log(id);
  try {
    const { db } = await connectToDatabase();
    await db.collection('products').deleteOne({ _id: ObjectID(id) });
    res.json({});
  } catch (err) {
    throw new Error(err);
  }
}
