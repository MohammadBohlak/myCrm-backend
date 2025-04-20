// app/api/customers/route.js
import nc from 'next-connect';
import Customer from '@/models/Customer';
import dbConnect from '@/utils/dbConnect';
import { runMiddleware } from '@/utils/cors';
import cors from '@/utils/cors';
// import { runMiddleware } from '@/utils/cors';

dbConnect();

const handler = nc();

// GET جميع العملاء
handler.get(async (req, res) => {
  // await runMiddleware(req, res, cors);

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
    
    const customers = await Customer.find({...query, isDeleted: false})
      .sort({ createdAt: -1 });
    
    res.send(customers);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch customers' });
  }
});

// POST إنشاء عميل جديد
handler.post(async (req, res) => {
  await runMiddleware(req, res, cors);
  
    const { name, email, phone, company, status, userId } = req.body;
    
    if (!name || !email) {
    //   await session.abortTransaction();
      return res.status(400).send({ error: 'Name and email are required' });
    }
    
    const newCustomer = new Customer({
      name,
      email,
      phone,
      company,
      status: status || 'lead',
      userId
    });
    try{

        await newCustomer.save();
        res.status(201).send(newCustomer);

    }
    catch (error){
        if (error.code === 11000) {
          return res.status(400).send({ error: 'Email already exists' });
        }

    }
    
    res.status(500).send({ error: 'Failed to create customer' });
 
});

export default handler;