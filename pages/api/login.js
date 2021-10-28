import { connectToDatabase } from '../../lib/mongodb';
import bcrypt from 'bcrypt';
import withSession from '../../lib/section';

export default withSession(async (req, res) => {
  const { email, password } = req.body;
  const { db } = await connectToDatabase();
  const usersDB = await db.collection('users');
  try {
    // 1) Check to see if a user exists with the provided email
    const user = await usersDB.findOne({ email });
    // 2) --if not, return error
    if (!user) {
      return res.status(404).send('No user exists with the provided email');
    }
    // 3) Check to see if user's password is matches the one in db
    const pwdMatch = await bcrypt.compare(password, user.password);
    if (pwdMatch) {
      const loginUser = {
        _id: user._id,
        isLoggedIn: true,
        name: user.name,
        email: user.email,
        role: user.role,
        createAt: user.createAt,
      };

      req.session.set('user', loginUser);
      await req.session.save();
      // 5) send that token to the client
      res.status(200).json(loginUser);
    } else {
      res.status(401).send('Password is incorrect');
    }
  } catch (error) {
    res.status(500).send('Error logging in user');
  }
});
