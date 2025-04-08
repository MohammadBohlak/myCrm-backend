// app/api/products/[id]/route.js
import nc from 'next-connect';
import Product from '@/models/Product';
import dbConnect from '@/utils/dbConnect';
import Sale from '@/models/Sale';

dbConnect();

/**
Get single product:
GET /api/products/PRODUCT_ID

Delete product:
DELETE /api/products/deleted/PRODUCT_ID
 */

const handler = nc();


// DELETE product
handler.delete(async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.query.id);
    
    if (!deletedProduct) {
      return res.status(404).send({ error: 'Product not found' });
    }
    
    res.send({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete product' });
  }
});


// export default async function handlerWrapper(req, res) {
//   req.query = { id: req.params.id };
//   return handler(req, res);
// }
export default handler