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
          userID: userID,
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

export const getMonthlySpend = async (req: Request, res: Response) => {
  try {
    const { userID, year } = req.params;
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;

    const result = await Entry.aggregate([
      {
        $match: {
          userID: userID,
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: { $substr: ['$date', 5, 2] },
          totalDebits: { $sum: '$debits' },
        },
      },
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const getYearlyCategorySpend = async (req: Request, res: Response) => {
  try {
    const { userID, year } = req.params;
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;

    const result = await Entry.aggregate([
      {
        $match: {
          userID: userID,
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
