// app/api/sales/[id]/restore/route.js
import nc from 'next-connect';
import Sale from '@/models/Sale';
import dbConnect from '@/utils/dbConnect';

const handler = nc();

handler.put(async (req, res) => {
  try {
    await dbConnect();
    const restoredSale = await Sale.findByIdAndUpdate(
      req.query.id,
      { 
        isDeleted: false,
        $unset: { deletedAt: 1 } 
      },
      { new: true }
    )

    res.json({
      success: true,
      message: 'Sale restored successfully',
      data: restoredSale
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to restore sale'
    });
  }
});

export default handler;