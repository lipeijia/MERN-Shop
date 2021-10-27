import { connectToDatabase } from '../../../lib/mongodb';

export default async (req, res) => {
  const { page, size } = req.query;
  // convert querystring  values to numbers
  const pageNum = Number(page);
  const pageSize = Number(size);
  try {
    const { db } = await connectToDatabase();
    let data;
    const totalDocs = await db.collection('products').countDocuments();
    const totalPages = Math.ceil(totalDocs / pageSize);

    if (pageNum === 1) {
      data = await db.collection('products').find({}).limit(pageSize).toArray();
    } else {
      const skips = pageSize * (pageNum - 1);
      data = await db
        .collection('products')
        .find({})
        .skip(skips)
        .limit(pageSize)
        .toArray();
    }
    res.status(200).json({ products: data, totalPages });
  } catch (error) {
    res.status(500).send('Server error in creating product');
  }
};
