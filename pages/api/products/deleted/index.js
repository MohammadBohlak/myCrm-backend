// app/api/products/index.js
import nc from "next-connect";
import Product from "@/models/Product";
import dbConnect from "@/utils/dbConnect";

dbConnect();


const handler = nc();

// GET all products
handler.get(async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };
    }

    const products = await Product.find({...query, isDeleted: true}).sort({ createdAt: -1 });
    res.send(products);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch products" });
  }
});


export default handler;
