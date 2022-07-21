import express from 'express';
import cors from 'cors';
import chalk from 'chalk'
import dotenv from 'dotenv';
import getCategory from './routes/categoriesRouter.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(getCategory);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(
    chalk.hex('#00ffff').bold(`Server is running on: http://localhost:${PORT}`)
  );
});