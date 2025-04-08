// app/api/interactions/[id]/index.js
import nc from 'next-connect';
import Interaction from '@/models/Interaction';
import dbConnect from '@/utils/dbConnect';

dbConnect();



/*
4. حذف تفاعل (DELETE)
DELETE /api/interactions/deleted/507f1f77bcf86cd799439022
*/

const handler = nc();

// DELETE - حذف تفاعل
handler.delete(async (req, res) => {
  try {
    const deletedInteraction = await Interaction.findByIdAndDelete(req.query.id);
    
    if (!deletedInteraction) {
      return res.status(404).send({ error: 'Interaction not found' });
    }
    
    return res.send({ message: 'Interaction deleted successfully' });
  } catch (error) {
    return res.status(500).send({ error: 'Failed to delete interaction' });
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