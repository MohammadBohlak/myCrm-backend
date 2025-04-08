// app/api/sales/index.js
import nc from 'next-connect';
import Sale from '@/models/Sale';
import dbConnect from '@/utils/dbConnect';

dbConnect();

/**
 Get all sales (with filters):

GET /api/sales
GET /api/sales?customerId=CUSTOMER_ID
GET /api/sales?productId=PRODUCT_ID
GET /api/sales?startDate=2023-06-01&endDate=2023-06-30


Create a sale:

POST /api/sales
Content-Type: application/json
{
  "customerId": "CUSTOMER_ID",
  "productId": "PRODUCT_ID",
  "amount": 999.99,
  "date": "2023-06-15"
}
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

    const sales = await Sale.find({...query, isDeleted: false})
      .populate('customerId', 'name email')
      .populate('productId', 'name price')
      .sort({ date: -1 });

    res.send(sales);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch sales' });
  }
});

// POST create new sale
handler.post(async (req, res) => {
  try {
    const { customerId, productId, amount, date } = req.body;

    if (!customerId || !productId || amount === undefined) {
      return res.status(400).send({ error: 'Customer, product and amount are required' });
    }

    const newSale = new Sale({
      customerId,
      productId,
      amount: Number(amount),
      date: date ? new Date(date) : new Date()
    });

    await newSale.save();
    
    // Populate the saved sale before returning
    const populatedSale = await Sale.findById(newSale._id)
      .populate('customerId', 'name email')
      .populate('productId', 'name price');

    res.status(201).send(populatedSale);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ error: error.message });
    }
    res.status(500).send({ error: 'Failed to create sale' });
  }
});

export default handler;