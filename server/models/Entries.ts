import mongoose from 'mongoose';

const EntrySchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Entry = mongoose.model('Entry', EntrySchema);

export default Entry;
