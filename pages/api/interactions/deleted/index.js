// app/api/interactions/route.js
import nc from 'next-connect';
import Interaction from '@/models/Interaction';
import dbConnect from '@/utils/dbConnect';

dbConnect();


const handler = nc();

handler.get(async (req, res) => {
  try {
    const interactions = await Interaction.find({isDeleted: true})
      .sort({ date: -1 })
    
    return res.send(interactions);
  } catch (error) {
    return res.status(500).send({ error: 'Failed to fetch interactions' });
  }
});


export default handler;