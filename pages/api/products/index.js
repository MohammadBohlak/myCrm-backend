// app/api/products/index.js
import nc from "next-connect";
import Product from "@/models/Product";
import dbConnect from "@/utils/dbConnect";

dbConnect();

/**
Create a product:

POST /api/products
Content-Type: application/json
{
  "name": "New Product",
  "price": 99.99,
  "description": "Product description"
}

Get all products (with optional search):

GET /api/products
GET /api/products?search=laptop

 */

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

    const products = await Product.find({...query, isDeleted: false}).sort({ createdAt: -1 });
    res.send(products);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch products" });
  }
});

// POST create new product
handler.post(async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!name || price === undefined) {
      return res.status(400).send({ error: "Name and price are required" });
    }

    const newProduct = new Product({
      name,
      price: Number(price),
      description,
    });

    await newProduct.save();
    res.status(201).send(newProduct);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).send({ error: error.message });
    }
    res.status(500).send({ error: "Failed to create product" });
  }
});

export default handler;
