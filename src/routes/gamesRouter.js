import express from 'express';
import { getGames, postGame } from '../controllers/gamesController.js';
import { validateGames } from '../middlewares/validateGame.js';

const router = express.Router();

router.get("/games", getGames);

export default router;