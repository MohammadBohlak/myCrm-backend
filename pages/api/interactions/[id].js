// app/api/interactions/[id]/route.js
import nc from 'next-connect';
import Interaction from '@/models/Interaction';
import dbConnect from '@/utils/dbConnect';

dbConnect();


/*

1. إنشاء تفاعل جديد (POST)

POST /api/interactions
Body:
{
  "customerId": "507f1f77bcf86cd799439011",
  "type": "call",
  "notes": "Customer agreed to schedule a demo"
}


2. جلب تفاعلات عميل معين (GET)

GET /api/interactions?customerId=507f1f77bcf86cd799439011



3. تحديث تفاعل (PUT)

PUT /api/interactions/507f1f77bcf86cd799439022
Body:
{
  "notes": "Updated notes after follow up"
}


4. حذف تفاعل (DELETE)

DELETE /api/interactions/507f1f77bcf86cd799439022
*/

const handler = nc();

// GET - جلب تفاعل معين
handler.get(async (req, res) => {
  try {
    const interaction = await Interaction.findById(req.query.id)
      .populate('customerId', 'name email');
    
    if (!interaction) {
      return res.status(404).send({ error: 'Interaction not found' });
    }
    
    return res.send(interaction);
  } catch (error) {
    return res.status(500).send({ error: 'Failed to fetch interaction' });
  }
});

// PUT - تحديث تفاعل
handler.put(async (req, res) => {
  try {
    const updatedInteraction = await Interaction.findByIdAndUpdate(
      req.query.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedInteraction) {
      return res.status(404).send({ error: 'Interaction not found' });
    }
    
    return res.send(updatedInteraction);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ error: error.message });
    }
    return res.status(500).send({ error: 'Failed to update interaction' });
  }
});

// DELETE - حذف تفاعل
// handler.delete(async (req, res) => {
//   try {
//     const deletedInteraction = await Interaction.findByIdAndDelete(req.query.id);
    
//     if (!deletedInteraction) {
//       return res.status(404).send({ error: 'Interaction not found' });
//     }
    
//     return res.send({ message: 'Interaction deleted successfully' });
//   } catch (error) {
//     return res.status(500).send({ error: 'Failed to delete interaction' });
//   }
// });
// /////////////////////////////

handler.delete(async (req, res) => {
    try {
      const interaction = await Interaction.findById(req.query.id);
      
      if (!interaction) {
        return res.status(404).json({ error: 'Interaction not found' });
      }
  
      interaction.isDeleted = true;
      interaction.deletedAt = new Date();
      await interaction.save();
  
      res.json({ message: 'Interaction soft deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete interaction' });
    }
  });

// export default async function handlerWrapper(req, res) {
//   req.query = { id: req.params.id };
//   return handler(req, res);
// }

export const config = {
  api: {
    externalResolver: true,
  },
};

export default handler 