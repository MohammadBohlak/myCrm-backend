// app/api/sales/index.js
import nc from 'next-connect';
import Sale from '@/models/Sale';
import dbConnect from '@/utils/dbConnect';

dbConnect();

/*
 Get all sales (with filters):

GET /api/sales/deleted
GET /api/sales/deleted?customerId=CUSTOMER_ID
GET /api/sales/deleted?productId=PRODUCT_ID
GET /api/sales/deleted?startDate=2023-06-01&endDate=2023-06-30

*/


const handler = nc();



// GET all sales
handler.get(async (req, res) => {
  try {
    const { customerId, productId, startDate, endDate } = req.query;
    let query = {};

    if (customerId) query.customerId = customerId;
    if (productId) query.productId = productId;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const sales = await Sale.find({...query, isDeleted: true})
    //   .populate('customerId', 'name email')
    //   .populate('productId', 'name price')
      .sort({ date: -1 });

    res.send(sales);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch sales' });
  }
});

export default handler;