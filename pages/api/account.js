import { connectToDatabase } from '../../lib/mongodb';
import withSession from '../../lib/section';

export default withSession(async (req, res) => {
  const user = req.session.get('user');
  if (user) {
    try {
      const { db } = await connectToDatabase();
      const hasUser = await db
        .collection('users')
        .findOne({ email: user.email });
      if (hasUser) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isLoggedIn: true,
        });
      } else {
        res.status(404).send('User not found.');
      }
    } catch (error) {
      res.status(403).send('Not a valid user');
    }
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
});
