// app/api/users/route.js
import nc from 'next-connect';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

// Connect to database
dbConnect();

const handler = nc();

handler.get(async (req, res) => {
    try {
        const customers = await User.find({
          role: 'customer',
          isDeleted: false
        }).select('-password -__v -isDeleted -deletedAt');
    
        res.status(200).json(customers);
      } catch (err) {
        res.status(500).json({
          success: false,
          error: 'Server Error'
        });
      }
  });

export default handler;