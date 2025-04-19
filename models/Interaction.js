  // models/Interaction.js
  import mongoose from "mongoose";

  const interactionSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["call", "email", "meeting"],
      default: "call",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
    },
    createdAt: {
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
  });

  // interactionSchema.pre(/^find/, function () {
  //   this.where({ isDeleted: false });
  // });

  export default mongoose.models.Interaction ||
    mongoose.model("Interaction", interactionSchema);
