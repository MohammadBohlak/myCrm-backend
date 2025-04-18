// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
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
