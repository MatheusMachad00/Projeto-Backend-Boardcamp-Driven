import express from 'express';
import { getGames, getGamesByName, postGame } from '../controllers/gamesController.js';
import { validateGame } from '../middlewares/validateGame.js';

const router = express.Router();

router.get("/games", getGames);
router.get("/games/:name", getGamesByName);
router.post("/games", validateGame, postGame);

export default router;