import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

//exported functions
import { connectDB } from './config/database.ts';

//route imports
import entryRoutes from './routes/entries.ts';
import User from './models/Users.ts';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config({ path: path.resolve(__dirname, './.env') });

const port = process.env.PORT || 3000;

//routes
app.use('/entries', entryRoutes);

app.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const newUser = new User({
      firstName,
      lastName,
      email,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

connectDB();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
