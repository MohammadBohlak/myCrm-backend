// app/api/customers/[id]/restore/route.js
import nc from 'next-connect';
import Customer from '@/models/Customer';
import dbConnect from '@/utils/dbConnect';
import mongoose from 'mongoose';

const handler = nc();

handler.put(async (req, res) => {
  try {
    await dbConnect();
    const { id } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const restoredCustomer = await Customer.findByIdAndUpdate(
      id,
      { 
        isDeleted: false,
        $unset: { deletedAt: 1 } 
      },
      { new: true, runValidators: true }
    );

    if (!restoredCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // استعادة البيانات المرتبطة
    // await Promise.all([
    //   mongoose.model('Interaction').updateMany(
    //     { customerId: id },
    //     { isDeleted: false, $unset: { deletedAt: 1 } }
    //   ),
    //   mongoose.model('Sale').updateMany(
    //     { customerId: id },
    //     { isDeleted: false, $unset: { deletedAt: 1 } }
    //   )
    // ]);

    res.json({
      success: true,
      message: 'Customer restored successfully',
      data: restoredCustomer
    });

  } catch (error) {
    console.error('Restore error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to restore customer',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default handler;