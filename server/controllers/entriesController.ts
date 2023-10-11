import express from 'express';
import Entry from '../models/Entries';
import { Request, Response } from 'express';

export const addEntries = async (req: Request, res: Response) => {
  try {
    const { userID, month, year } = req.params;
    const entries = req.body;

    for (const entryData of entries) {
      const { userID, description, category } = entryData;

      const entry = new Entry({
        userID,
        description,
        category,
      });

      await entry.save();
    }

    //return the updated array of entries after adding as a response
    const updatedEntries = await Entry.find({
      userID,
      $expr: {
        $and: [
          { $eq: [{ $month: '$createdAt' }, month] },
          { $eq: [{ $year: '$createdAt' }, year] },
        ],
      },
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
      $expr: {
        $and: [
          { $eq: [{ $month: '$createdAt' }, month] },
          { $eq: [{ $year: '$createdAt' }, year] },
        ],
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
  date?: Date;
}

export const editEntry = async (req: Request, res: Response) => {
  try {
    const { entryID } = req.params;
    const { newDescription, newCategory, newDate } = req.body;

    const updateFields: UpdateFields = {};

    if (newDescription) updateFields.description = newDescription;
    if (newCategory) updateFields.category = newCategory;
    if (newDate) updateFields.date = newDate;

    const result = await Entry.updateOne(
      { _id: entryID },
      { $set: updateFields }
    );

    const updatedEntry = await Entry.findById(entryID);

    res.status(200).json(updatedEntry);
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
      $expr: {
        $and: [
          { $eq: [{ $month: '$createdAt' }, month] },
          { $eq: [{ $year: '$createdAt' }, year] },
        ],
      },
    });

    res.status(200).json(updatedEntries);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
