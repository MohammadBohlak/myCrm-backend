// app/api/interactions/route.js
import nc from 'next-connect';
import Interaction from '@/models/Interaction';
import dbConnect from '@/utils/dbConnect';

dbConnect();



/*

1. إنشاء تفاعل جديد (POST)

POST /api/interactions
Body:
{
  "customerId": "67f2ed8f095b61a2f3b24a53",
  "type": "call",
  "notes": "Customer agreed to schedule a demo"
}

*/
const handler = nc();

// GET - جلب جميع التفاعلات
handler.get(async (req, res) => {
  try {
    const interactions = await Interaction.find({isDeleted: false})
      .sort({ date: -1 })
      .populate('customerId', 'name email');
    
    return res.send(interactions);
  } catch (error) {
    return res.status(500).send({ error: 'Failed to fetch interactions' });
  }
});

// POST - إنشاء تفاعل جديد
handler.post(async (req, res) => {
  try {
    const { customerId, type, date, notes , userId} = req.body;
    
    // التحقق من الحقول المطلوبة
    if (!customerId || !type) {
      return res.status(400).send({ error: 'Customer ID and type are required' });
    }
    
    const newInteraction = new Interaction({
      customerId,
      type,
      date: date || Date.now(),
      notes,
      userId
    });
    
    await newInteraction.save();
    return res.status(201).send(newInteraction);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ error: error.message });
    }
    return res.status(500).send({ error: 'Failed to create interaction' });
  }
});

export default handler;