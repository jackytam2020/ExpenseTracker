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
    date: {
      type: String,
      required: true,
    },
    income: {
      type: Number,
      required: false,
    },
    debits: {
      type: Number,
      required: false,
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
