import express from 'express';
import { getCustomers } from '../controllers/customersController';

const router = express.Router();

router.get("/games", getCustomers);   


export default router;