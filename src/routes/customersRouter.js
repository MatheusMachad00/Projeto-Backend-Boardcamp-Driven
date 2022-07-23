import express from 'express';
import { getCustomers, getCustomerById, createCustomer } from '../controllers/customersController.js';
import { validadteCustomer } from '../middlewares/validadeCustomer.js';

const router = express.Router();

router.get("/customers", getCustomers);
/* router.get("/customers/:id", getCustomerById); */
router.post("/customers", validadteCustomer, createCustomer);    


export default router;