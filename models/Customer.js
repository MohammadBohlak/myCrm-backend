// models/Customer.js
import mongoose from "mongoose";


const customerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please enter a valid email"],
  },
  phone: {
    type: String,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["lead", "active", "inactive"],
    default: "lead",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date
  }
}, { timestamps: true });

// تحديث حقل updatedAt قبل الحفظ
// customerSchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// customerSchema.pre(/^find/, function() {
//     this.where({ isDeleted: false });
//   });
  


  // في middleware حذف العميل
// customerSchema.pre('save', function(next) {
//     if (this.isModified('isDeleted') && this.isDeleted) {
//       // تحديث المبيعات المرتبطة
//       Sale.updateMany(
//         { customerId: this._id },
//         { isDeleted: true, deletedAt: new Date() }
//       ).exec();
      
//       // تحديث التفاعلات المرتبطة
//       Interaction.updateMany(
//         { customerId: this._id },
//         { isDeleted: true, deletedAt: new Date() }
//       ).exec();
//     }
//     next();
//   });
export default mongoose.models.Customer ||
  mongoose.model("Customer", customerSchema);
