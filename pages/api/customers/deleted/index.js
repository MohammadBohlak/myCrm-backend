// app/api/customers/route.js
import nc from 'next-connect';
import Customer from '@/models/Customer';
import dbConnect from '@/utils/dbConnect';

dbConnect();

const handler = nc();

// GET جميع العملاء
handler.get(async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (status) {
      query.status = status;
    }
    
    const customers = await Customer.find({...query, isDeleted: true})
      .sort({ createdAt: -1 });
    
    res.send({customers});
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch customers' });
  }
});



export default handler;