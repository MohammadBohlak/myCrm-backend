// app/api/users/[id]/restore/route.js
import nc from 'next-connect';
import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';

const handler = nc();

handler.put(async (req, res) => {
  try {
    await dbConnect();
    const { id } = req.query;

    // إعادة تعيين البريد الإلكتروني إذا كان يحتوي على بادئة deleted_
    const user = await User.findById(id);
    let email = user.email;
    
    if (email.startsWith('deleted_')) {
      email = email.replace(/^deleted_\d+_/, '');
    }

    const restoredUser = await User.findByIdAndUpdate(
      id,
      { 
        isDeleted: false,
        email,
        $unset: { deletedAt: 1 } 
      },
      { new: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'User restored successfully',
      data: restoredUser
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to restore user'
    });
  }
});

export default handler;