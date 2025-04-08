import nc from 'next-connect';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import mongoose from 'mongoose'; // تأكد من استيراد mongoose للتحقق من ObjectId

const handler = nc();

handler.delete(async (req, res) => {
  try {
    // 1. الاتصال بقاعدة البيانات (مع await)
    await dbConnect();

    // 2. التحقق من صحة ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.query.id)) {
      return res.status(400).send({ error: 'Invalid user ID format' });
    }

    // 3. حذف المستخدم
    const deletedUser = await User.findByIdAndDelete(req.query.id);
    
    if (!deletedUser) {
      return res.status(404).send({ error: 'User not found' });
    }

    // 4. (اختياري) تحديث العملاء المرتبطين بهذا المستخدم
    await mongoose.model('Customer').updateMany(
      { userId: req.query.id },
      { $set: { isDeleted: true } }
    );

    res.send({ 
      success: true,
      message: 'User deleted successfully',
      deletedUserId: req.query.id
    });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).send({ 
      success: false,
      error: 'Failed to delete user',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default handler;

// import nc from 'next-connect';
// import dbConnect from '@/utils/dbConnect';
// import User from '@/models/User';

//  dbConnect();



// const handler = nc();


// handler.delete(async (req, res) => {
//     try {
//       const deletedUser = await User.findByIdAndDelete(req.query.id);
      
//       if (!deletedUser) {
//         return res.status(404).send({ error: 'User not found' });
//       }
      
//       res.send({ message: 'User deleted successfully' });
//     } catch (error) {
//       res.status(500).send({ error: 'Failed to delete user' });
//     }

//   });
  