import Entry from '../models/Entries';
import { Request, Response } from 'express';

export const getCategoryExpenses = async (req: Request, res: Response) => {
  try {
    const { userID, month, year } = req.params;
    const startDate = `${year}-${month}-01`;
    const endDate = `${year}-${month}-31`;
    const result = await Entry.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: '$category',
          totalAmount: { $sum: { $add: ['$income', '$debits'] } },
        },
      },
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
