// app/api/users/route.js
import nc from 'next-connect';
import User from '@/models/User';
import dbConnect from '@/utils/dbConnect';

// Connect to database
dbConnect();

const handler = nc();

/**
POST /api/users/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "simplepassword",
  "role": "customer"
  "userName" : "kajsdkwh"
}
 */
handler.post(async (req, res) => {
  try {
    const {userName, email, password, phone, status, company,theme= "light",  role = 'customer' } = req.body;

    // Validation
    if (!email) {
      return res.status(400).send({ error: 'Email is required' });
    }
    if(!password){
      
      return res.status(400).send({ error: 'Password is required' });
    }
    if(!userName){
      
      return res.status(400).send({ error: 'User Name is required' });
    }

    // Check if user exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).send({ error: 'Email is already exists' });
    }
    const existsName = await User.findOne({ userName });
    if (existsName) {
      return res.status(400).send({ error: 'User Name is already exists' });
    }

    // Create user (password stored in plaintext - FOR TESTING ONLY)
    const user = new User({ email, password, phone, userName,company, status,theme, role });
    await user.save();
    
    // Return user without password (even though it's plaintext)
    const userData = user.toObject();
    delete userData.password;
    
    return res.status(201).send(userData);
    
  } catch (error) {
    return res.status(500).send({ error: 'User registration failed' });
  }
});

export default handler;