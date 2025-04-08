// app/api/users/route.js
import nc from 'next-connect';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

// Connect to database
dbConnect();

const handler = nc();

handler.get(async (req, res) => {
    try {      
      const users = await User.find({isDeleted: true})
      .select("-password -__v") // استبعاد الحقول الحساسة
        .sort({ createdAt: -1 }); // الأحدث أولاً
  
      res.send(users);
      
    } catch (err) {
      console.error("Get users error:", err);
      res.status(500).send({
        success: false,
        error: "Failed to fetch users",
        details: process.env.NODE_ENV === 'development' ? err.message : null
      });
    }
  });

export default handler;