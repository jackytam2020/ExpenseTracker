import express from 'express';
import { getCategoryExpenses } from '../controllers/chartData.Controller';
const router = express.Router();

router.get('/:userID/:month/:year/getCategoryExpenses', getCategoryExpenses);

export default router;
