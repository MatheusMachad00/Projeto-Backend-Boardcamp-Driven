import express from 'express';
import cors from 'cors';
import chalk from 'chalk'
import dotenv from 'dotenv';
import category from './routes/categoriesRouter.js';
import game from './routes/gamesRouter.js';
import customers from './routes/customersRouter.js'

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(category);
app.use(game);
app.use(customers);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(
    chalk.hex('#00ffff').bold(`Server is running on: http://localhost:${PORT}`)
  );
});