// app/api/sales/[id]/route.js
import nc from 'next-connect';
import Sale from '@/models/Sale';
import dbConnect from '@/utils/dbConnect';

dbConnect();

/**
 Get single sale:
GET /api/sales/SALE_ID

Update sale:
PUT /api/sales/SALE_ID
Content-Type: application/json
{
  "amount": 1099.99
}

Delete sale:
DELETE /api/sales/SALE_ID
 */

const handler = nc();

// 
// DELETE sale
handler.delete(async (req, res) => {
  try {
    const deletedSale = await Sale.findByIdAndDelete(req.query.id);
    
    if (!deletedSale) {
      return res.status(404).send({ error: 'Sale not found' });
    }
    
    res.send({ message: 'Sale deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete sale' });
  }
});

// export default async function handlerWrapper(req, res) {
//   req.query = { id: req.params.id };
//   return handler(req, res);
// }

export default handler