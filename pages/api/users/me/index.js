// app/api/users/route.js
import nc from 'next-connect';
import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';

// Connect to database
dbConnect();

const handler = nc();

/**
 * GET /api/users/me
 * Get current user data
 * 
 * Query params:
 * ?userId=USER_ID
  
  GET /api/users/me?userId=USER_ID_FROM_RESPONSE
 */
handler.get(async (req, res) => {
  try {
    const userId = req.query.userId;
    
    if (!userId) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    return res.send(user);
    
  } catch (error) {
    return res.status(500).send({ error: 'Failed to fetch user data' });
  }
});

export default handler;