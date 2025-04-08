// app/api/interactions/[id]/restore/route.js
import nc from 'next-connect';
import Interaction from '@/models/Interaction';
import dbConnect from '@/utils/dbConnect';

const handler = nc();

handler.put(async (req, res) => {
  try {
    await dbConnect();
    const restoredInteraction = await Interaction.findByIdAndUpdate(
      req.query.id,
      { 
        isDeleted: false,
        $unset: { deletedAt: 1 } 
      },
      { new: true }
    );
    res.json({
      success: true,
      message: 'Interaction restored successfully',
      data: restoredInteraction
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to restore interaction'
    });
  }
});

export default handler;