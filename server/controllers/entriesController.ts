import express from 'express';
import Entry from '../models/Entries';
import { Request, Response } from 'express';

export const addEntries = async (req: Request, res: Response) => {
  try {
    const { userID, month, year } = req.params;
    const entries = req.body;

    for (const entryData of entries) {
      const { userID, description, category, date, income, debits } = entryData;

      const entry = new Entry({
        userID,
        description,
        category,
        date,
        income,
        debits,
      });

      await entry.save();
    }

    //return the updated array of entries after adding as a response
    const updatedEntries = await Entry.find({
      userID,
      date: { $regex: `^${year}-${month}` },
    });
    res.status(201).json(updatedEntries);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const getEntriesByMonth = async (req: Request, res: Response) => {
  try {
    const { userID, month, year } = req.params;

    const entries = await Entry.find({
      userID,
      date: { $regex: `^${year}-${month}` },
    });

    if (entries.length === 0) {
      return res
        .status(404)
        .json({ message: 'No entries found for the specified criteria.' });
    }

    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const getEntriesByYear = async (req: Request, res: Response) => {
  try {
    const { userID, year } = req.params;

    const entries = await Entry.find({
      userID,
      $expr: {
        $eq: [{ $year: '$createdAt' }, year],
      },
    });

    if (entries.length === 0) {
      return res
        .status(404)
        .json({ message: 'No entries found for the specified criteria.' });
    }

    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

interface UpdateFields {
  description?: string;
  category?: string;
  date?: string;
  income?: number;
  debits?: number;
}

export const editEntry = async (req: Request, res: Response) => {
  try {
    const { userID, entryID, month, year } = req.params;
    const { newDescription, newCategory, newDate, newIncome, newDebit } =
      req.body;

    const updateFields: UpdateFields = {};

    if (newDescription) updateFields.description = newDescription;
    if (newCategory) updateFields.category = newCategory;
    if (newDate) updateFields.date = newDate;
    if (newIncome) updateFields.income = newIncome;
    if (newDebit) updateFields.debits = newDebit;

    if (newCategory === 'Income') updateFields.debits = 0;
    if (newCategory !== 'Income') updateFields.income = 0;

    const result = await Entry.updateOne(
      { _id: entryID },
      { $set: updateFields }
    );

    const updatedEntries = await Entry.find({
      userID,
      date: { $regex: `^${year}-${month}` },
    });

    res.status(200).json(updatedEntries);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const deleteEntry = async (req: Request, res: Response) => {
  try {
    const { entryID, userID, month, year } = req.params;

    const deletedEntry = await Entry.findById(entryID);

    if (deletedEntry) {
      await Entry.deleteOne({ _id: entryID });
    }

    //return updated entries in the current month and year as a response
    const updatedEntries = await Entry.find({
      userID,
      date: { $regex: `^${year}-${month}` },
    });

    res.status(200).json(updatedEntries);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
