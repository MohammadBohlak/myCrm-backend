// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName:{
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
    theme: {
      type: String,
      enum: ["light", "dark", 'red', 'blue', 'green', 'yellow'],
      default: "light",
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
      default: false,
    },
    deletedAt: {
      type: Date,
    },
    company: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["lead", "active", "inactive", "member"],
      default: "member",
    },
  },
  { timestamps: true }
);


// لمنع تسجيل دخول المستخدمين المحذوفين
userSchema.methods.isActive = function () {
  return !this.isDeleted;
};

// في middleware حذف المستخدم
userSchema.pre('save', function(next) {
    if (this.isModified('isDeleted') && this.isDeleted) {
      // تحديث العملاء المرتبطين
      Customer.updateMany(
        { userId: this._id },
        { $set: { isDeleted: true } }
      ).exec();
    }
    next();
  });
export default mongoose.models.User || mongoose.model("User", userSchema);
