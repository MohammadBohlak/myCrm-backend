// app/api/customers/[id]/route.js
import nc from "next-connect";
import Customer from "@/models/Customer";
import dbConnect from "@/utils/dbConnect";
import Sale from "@/models/Sale";
import Interaction from "@/models/Interaction";

// الاتصال بقاعدة البيانات
dbConnect();

const handler = nc();


// DELETE - حذف العميل بشكل فعلي
handler.delete(async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.query.id);

    if (!deletedCustomer) {
      return res.status(404).send({ error: 'Customer not found' });
    }

    return res.send({ message: 'Customer deleted successfully' });
  } catch (error) {
    return res.status(500).send({ error: 'Failed to delete customer' });
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
