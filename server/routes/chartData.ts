import express from 'express';
import {
  getCategoryExpenses,
  getMonthlySpend,
  getYearlyCategorySpend,
} from '../controllers/chartData.Controller';
const router = express.Router();

router.get('/:userID/:month/:year/getCategoryExpenses', getCategoryExpenses);
router.get('/:userID/:year/getMonthlySpend', getMonthlySpend);
router.get('/:userID/:year/getYearlyCategorySpend', getYearlyCategorySpend);

export default router;
