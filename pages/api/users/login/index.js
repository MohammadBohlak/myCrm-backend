// app/api/users/route.js
import nc from 'next-connect';
import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';
import Customer from '@/models/Customer';

// Connect to database
dbConnect();

const handler = nc();

/**
POST /api/users/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "simplepassword"
}
 */
handler.post(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: 'Invalid credentials', loggedIn: false });
    }

    // Compare plaintext passwords (FOR TESTING ONLY)
    if (password !== user.password) {
      return res.status(401).send({ error: 'Invalid credentials' ,loggedIn: false});
    }

    // Return user without password
    const userData = user.toObject();
    delete userData.password;
    
    return res.send({userData, loggedIn: true});
    
  } catch (error) {
    return res.status(500).send({ error: 'Login failed', loggedIn: false });
  }
});

handler.delete(async (req, res) => {
    // const session = await mongoose.startSession();
    // session.startTransaction();
    
    try {
      const { id } = req.query;
    //   const { deletedBy } = req.body; // ID المستخدم الذي قام بالحذف (اختياري)
  
      // 1. البحث عن المستخدم المراد حذفه
      const user = await User.findById(id)      
      if (!user) {
        // await session.abortTransaction();
        return res.status(404).json({ error: 'User not found' });
      }
  
      // 2. منع حذف المديرين
      if (user.role === 'admin') {
        // await session.abortTransaction();
        return res.status(403).json({ error: 'Cannot delete admin users' });
      }
  
      // 3. تحديث المستخدم لحذفه ناعماً
      user.isDeleted = true;
      user.deletedAt = new Date();
    //   user.deletedBy = deletedBy || null;
      await user.save();
    //   await user.save({ session });
  
      // 4. إزالة ارتباط المستخدم من العملاء (بدون حذفهم)
      await Customer.updateMany(
        { userId: user._id },
        { $unset: { userId: 1 } }
        // { session }
      );
  
    //   await session.commitTransaction();
      
      res.json({ 
        message: 'User soft deleted successfully',
        userId: user._id,
        deletedAt: user.deletedAt
      });
    } catch (error) {
    //   await session.abortTransaction();
      console.error('Soft delete error:', error);
      res.status(500).json({ 
        error: 'Failed to soft delete user',
        details: error.message 
      });
    } finally {
    //   session.endSession();
    }
  });
export default handler;