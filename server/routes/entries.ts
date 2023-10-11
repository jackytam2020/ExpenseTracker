import express from 'express';
import {
  getEntriesByMonth,
  getEntriesByYear,
  addEntries,
  deleteEntry,
  editEntry,
} from '../controllers/entriesController';

const router = express.Router();

router.get('/:userID/:month/:year/getEntriesByMonth', getEntriesByMonth);
router.get('/:userID/:year/getEntriesByYear', getEntriesByYear);
router.patch('/:entryID/editEntry', editEntry);
router.delete('/:entryID/:userID/:month/:year/deleteEntry', deleteEntry);
router.post('/addEntry', addEntries);

export default router;
