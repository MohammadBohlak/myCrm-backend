// app/api/customers/[id]/route.js
import nc from "next-connect";
import Customer from "@/models/Customer";
import dbConnect from "@/utils/dbConnect";
import Sale from "@/models/Sale";
import Interaction from "@/models/Interaction";

// الاتصال بقاعدة البيانات
dbConnect();

const handler = nc();

// GET - جلب بيانات عميل معين
handler.get(async (req, res) => {
  try {
    const customer = await Customer.findById(req.query.id);

    if (!customer) {
      return res.status(404).send({ error: "Customer not found" });
    }

    return res.send(customer);
  } catch (error) {
    return res.status(500).send({ error: "Failed to fetch customer" });
  }
});

// PUT - تحديث بيانات العميل
handler.put(async (req, res) => {
  try {
    const updateData = req.body;

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.query.id,
      { ...updateData, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).send({ error: "Customer not found" });
    }

    return res.send(updatedCustomer);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).send({ error: error.message });
    }
    return res.status(500).send({ error: "Failed to update customer" });
  }
});

// DELETE - حذف العميل بشكل فعلي
// handler.delete(async (req, res) => {
//   try {
//     const deletedCustomer = await Customer.findByIdAndDelete(req.query.id);

//     if (!deletedCustomer) {
//       return res.status(404).send({ error: 'Customer not found' });
//     }

//     return res.send({ message: 'Customer deleted successfully' });
//   } catch (error) {
//     return res.status(500).send({ error: 'Failed to delete customer' });
//   }
// });

//////////////////////////////

handler.delete(async (req, res) => {
  try {
    //   const customer = await Customer.findById(req.query.id);
    const customer = await Customer.findByIdAndUpdate(
      req.query.id,
      { isDeleted: true },
      { new: true, runValidators: true }
    );

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

      customer.isDeleted = true;
      customer.deletedAt = new Date();
      await customer.save();

    // حذف ناعم للبيانات المرتبطة
    await Interaction.updateMany(
        { customerId: customer._id },
        { $set: { 
          isDeleted: true,
          deletedAt: new Date() 
        }}
      );

    await Sale.updateMany(
      { customerId: customer._id },
      { $set: { 
        isDeleted: true,
        deletedAt: new Date() 
      }}
    );

    res.json({
      message: "Customer and related data soft deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete customer" });
  }
});

// export default async function handlerWrapper(req, res) {
//   // نمرر الـ id كـ query parameter
//   req.query = { id: req.params.id };
//   return handler(req, res);
// }

export const config = {
  api: {
    externalResolver: true,
  },
};
export default handler;
