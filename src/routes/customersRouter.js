import express from 'express';
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer
} from '../controllers/customersController.js';
import { validadteCustomer } from '../middlewares/validadeCustomer.js';

const router = express.Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomerById);
router.post("/customers", validadteCustomer, createCustomer);
router.put("/customers/:id", validadteCustomer, updateCustomer);


export default router;