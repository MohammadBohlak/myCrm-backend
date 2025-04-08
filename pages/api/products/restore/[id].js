// app/api/products/[id]/restore/route.js
import nc from 'next-connect';
import Product from '@/models/Product';
import dbConnect from '@/utils/dbConnect';

const handler = nc();

handler.put(async (req, res) => {
  try {
    await dbConnect();
    const restoredProduct = await Product.findByIdAndUpdate(
      req.query.id,
      { 
        isDeleted: false,
        $unset: { deletedAt: 1 } 
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Product restored successfully',
      data: restoredProduct
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to restore product'
    });
  }
});

export default handler;