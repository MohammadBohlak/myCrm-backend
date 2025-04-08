// app/api/products/[id]/route.js
import nc from 'next-connect';
import Product from '@/models/Product';
import dbConnect from '@/utils/dbConnect';
import Sale from '@/models/Sale';

dbConnect();

/**
Get single product:
GET /api/products/PRODUCT_ID

Update product:

PUT /api/products/PRODUCT_ID
Content-Type: application/json
{
  "price": 1099.99
}

Delete product:
DELETE /api/products/PRODUCT_ID
 */

const handler = nc();

// GET single product
handler.get(async (req, res) => {
  try {
    const product = await Product.findById(req.query.id);
    
    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }
    
    res.send(product);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch product' });
  }
});

// PUT update product
handler.put(async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.query.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedProduct) {
      return res.status(404).send({ error: 'Product not found' });
    }
    
    res.send(updatedProduct);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ error: error.message });
    }
    res.status(500).send({ error: 'Failed to update product' });
  }
});

// DELETE product
// handler.delete(async (req, res) => {
//   try {
//     const deletedProduct = await Product.findByIdAndDelete(req.query.id);
    
//     if (!deletedProduct) {
//       return res.status(404).send({ error: 'Product not found' });
//     }
    
//     res.send({ message: 'Product deleted successfully' });
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to delete product' });
//   }
// });


// ////////////////////////////
handler.delete(async (req, res) => {
    try {
      const product = await Product.findById(req.query.id);
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      product.isDeleted = true;
      product.deletedAt = new Date();
      await product.save();
      
      // حذف ناعم للمبيعات المرتبطة
      await Sale.updateMany(
        { productId: product._id },
        { isDeleted: true, deletedAt: new Date() }
      );
  
      res.json({ message: 'Product and related sales soft deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  });

// export default async function handlerWrapper(req, res) {
//   req.query = { id: req.params.id };
//   return handler(req, res);
// }
export default handler