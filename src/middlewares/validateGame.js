import joi from "joi";
import connection from "../dbStrategy/postgres.js";

export async function validateGame(req, res, next) {
  const game = req.body;

  const gameSchema = joi.object({
    name: joi.string().required().min(1),
    image: joi.string().pattern(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/).required(),
    stockTotal: joi.number().required().greater(0),
    categoryId: joi.number().required(),
    pricePerDay: joi.number().required().greater(0)
  });

  const validation = gameSchema.validate(game);

  if (validation.error) {
    return res.status(422).send(validation.error.details.map( detail => detail.message))
  };

  const checkGameName = await connection.query('SELECT * FROM games WHERE name = ($1)', [game.name]);


  if (checkGameName.rows.length != 0) {
    return res.status(409).send({ errorMessage: "Nome já cadastrado." });
  };

  next();
}