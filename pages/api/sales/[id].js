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

// GET single sale
handler.get(async (req, res) => {
  try {
    const sale = await Sale.findById(req.query.id)
      .populate('customerId', 'name email')
      .populate('productId', 'name price');
    
    if (!sale) {
      return res.status(404).send({ error: 'Sale not found' });
    }
    
    res.send(sale);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch sale' });
  }
});

// PUT update sale
handler.put(async (req, res) => {
  try {
    const updatedSale = await Sale.findByIdAndUpdate(
      req.query.id,
      req.body,
      { new: true, runValidators: true }
    )
    .populate('customerId', 'name email')
    .populate('productId', 'name price');
    
    if (!updatedSale) {
      return res.status(404).send({ error: 'Sale not found' });
    }
    
    res.send(updatedSale);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ error: error.message });
    }
    res.status(500).send({ error: 'Failed to update sale' });
  }
});

// DELETE sale
// handler.delete(async (req, res) => {
//   try {
//     const deletedSale = await Sale.findByIdAndDelete(req.query.id);
    
//     if (!deletedSale) {
//       return res.status(404).send({ error: 'Sale not found' });
//     }
    
//     res.send({ message: 'Sale deleted successfully' });
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to delete sale' });
//   }
// });
// /////////////////
handler.delete(async (req, res) => {
    try {
      const sale = await Sale.findById(req.query.id);
      
      if (!sale) {
        return res.status(404).json({ error: 'Sale not found' });
      }
  
      sale.isDeleted = true;
      sale.deletedAt = new Date();
      await sale.save();
  
      res.json({ message: 'Sale soft deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete sale' });
    }
  });

// export default async function handlerWrapper(req, res) {
//   req.query = { id: req.params.id };
//   return handler(req, res);
// }

export default handler