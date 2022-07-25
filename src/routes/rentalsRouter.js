import express from 'express';
import { getRentals, createRental, deleteRental } from '../controllers/rentalsController.js';


const router = express.Router();

router.get("/rentals", getRentals);
router.post("/rentals", createRental);
router.delete("/rentals/:id", deleteRental);

export default router;