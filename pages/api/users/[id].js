
import nc from 'next-connect';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import Customer from '@/models/Customer';

// Connect to database
dbConnect();

const handler = nc();

handler.get(async (req, res) => {
  try {
    console.log("id:: ",req.query.id)
    // const { id } = req.query;
    
    // التحقق من صحة ObjectId قبل الاستعلام
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({
    //     success: false,
    //     error: "Invalid user ID format"
    //   });
    // }
    const user = await User.findById(req.query.id)
    // .select("-password -__v") // استبعاد الحقول الحساسة
    ;
    console.log(user)

    // const user = await User.findById(id)
      // .select("-password -__v -refreshToken") // استبعاد الحقول الحساسة
      // .lean(); // لتحسين الأداء

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    // إضافة بيانات إضافية إذا لزم الأمر
    // const userData = {
    //   ...user,
    //   metadata: {
    //     registeredSince: new Date(user.createdAt).toLocaleDateString(),
    //     isActive: !user.isDeleted
    //   }
    // };

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (err) {
    console.error("Get user by ID error:", err);
    res.status(500).json({
      success: false,
      error: "Server error",
      details: process.env.NODE_ENV === 'development' ? err.message : null
    });
  }
});

handler.delete(async (req, res) => {
    try {

      // const user = await User.findById(req.query.id);
      const user = await User.findByIdAndUpdate(
        req.query.id,
        { isDeleted: true },
        { new: true, runValidators: true }
      );
  
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
    
      user.isDeleted = true;
      user.deletedAt = new Date();
      await user.save();
      
      // إزالة ارتباط المستخدم من العملاء
      await Customer.updateMany(
        { userId: user._id },
        { $set: { 
          isDeleted: true,
          deletedAt: new Date() 
        }}
      );
  
      res.json({ message: 'User soft deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  });

  handler.put(async (req, res) => {
    try {
      const { id } = req.query;
      const updateData = req.body;
  
      // إذا كانت هناك كلمة سر جديدة، نقوم بتشفيرها
      // if (updateData.password) {
      //   updateData.password = await hashPassword(updateData.password);
      // }
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { 
          ...updateData,
          updatedAt: Date.now() 
        },
        { 
          new: true,
          runValidators: true 
        }
      )
      // .select("-password"); // استبعاد كلمة السر من الناتج
  
      if (!updatedUser) {
        return res.status(404).send({ error: "User not found" });
      }
  
      res.send(updatedUser);
    } catch (err) {
      console.error("Update error:", err);
      
      if (err.name === "ValidationError") {
        return res.status(400).send({ error: err.message });
      }
      
      res.status(500).send({ 
        error: "Failed to update user",
        details: err.message 
      });
    }
  });

export default handler;
