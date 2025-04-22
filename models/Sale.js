// models/Sale.js
import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    // المعلومات الأساسية
   
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    status: {
      type: String,
      enum: ["pending", "completed", "canceled", "refunded"],
      default: "completed",
      required: true 
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },

    productName: {
        type: String,
        required: true,
    },

    customerName: {
        type: String,
        required: true,
    },
    customerPhone: {
      type: String,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false
    },


  },
  {
    timestamps: true, // createdAt, updatedAt تلقائيًا
  }
);

export default mongoose.models.Sale || mongoose.model("Sale", saleSchema);

// // models/Sale.js
// import mongoose from "mongoose";

// const saleSchema = new mongoose.Schema(
//   {
//     customerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Customer",
//       required: [true, "Customer ID is required"],
//     },
//     productId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Product",
//       required: [true, "Product ID is required"],
//     },
    // amount: {
    //   type: Number,
    //   required: [true, "Amount is required"],
    //   min: [0, "Amount cannot be negative"],
    // },
//     date: {
//       type: Date,
//       default: Date.now,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//     isDeleted: {
//       type: Boolean,
//       default: false,
//     },
//     deletedAt: {
//       type: Date,
//     },
//   },
//   { timestamps: true }
// );

// // saleSchema.pre(/^find/, function () {
// //   this.where({ isDeleted: false });
// // });

// export default mongoose.models.Sale || mongoose.model("Sale", saleSchema);
