import { connectToDatabase } from '../../lib/mongodb';
import { ObjectID } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import withSession from '../../lib/section';

export default withSession(async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const { db } = await connectToDatabase();
    const usersDB = await db.collection('users');
    const user = await usersDB.findOne({ email });
    // 0) Validate name / email / password
    if (!isLength(name, { min: 3, max: 10 })) {
      return res.status(422).send('Name must be 3-10 characters long.');
    } else if (!isLength(password, { min: 6 })) {
      return res
        .status(422)
        .send('Password must be at least 6 characters long.');
    } else if (!isEmail(email)) {
      return res.status(422).send('Email must be valid.');
    }

    // 1) Check to see if the user already exists in the db
    if (user) {
      return res.status(422).send(`User already exists with email: ${email}`);
    }

    // 2-1) --if not, create user hash their password and stored it to the db
    const hashPwd = await bcrypt.hash(password, 10);
    const newUser = {
      _id: ObjectID(),
      name,
      email,
      password: hashPwd,
      createAt: new Date(),
      updateAt: new Date(),
      role: 'member',
    };
    await usersDB.insertOne({ ...newUser });
    // 2-2) add cart document link to the user
    const cart = {
      user: newUser._id,
      products: [],
    };
    const cartDB = await db.collection('cart');
    await cartDB.insertOne({ ...cart });

    const loginUser = {
      isLoggedIn: true,
      name: newUser.name,
      email: newUser.email,
      createAt: createAt,
      role: newUser.role,
    };
    req.session.set('user', loginUser);
    await req.session.save();
    res.json(loginUser);
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
