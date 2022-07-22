import express from 'express';
import { getCustomers, createCustomer } from '../controllers/customersController.js';

const router = express.Router();

router.get("/customers", getCustomers);
router.post("/customers", createCustomer);    


export default router;