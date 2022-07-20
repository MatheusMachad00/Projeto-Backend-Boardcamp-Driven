import express from 'express';
import cors from 'cors';
import chalk from 'chalk'
import dotenv from 'dotenv';



import connection from './dbStrategy/postgres.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/customers", async (_, res) => {
	try {
    
    //desestruturação das rows
    const {rows: customers} = await connection.query('SELECT * FROM customers');
    res.send(customers);

  } catch (error) {
    
  }
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(
    chalk.hex('#00ffff').bold(`Server is running on: http://localhost:${PORT}`)
  );
});