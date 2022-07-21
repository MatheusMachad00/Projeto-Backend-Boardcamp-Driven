import joi from "joi";
import connection from "../dbStrategy/postgres.js";

export async function validateGames(req, res, next){
  const game = req.body;

  const gameSchema = joi.object({
    name: joi.string().required().min(1),
    image: joi.string().pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/).required(),
    stockTotal: joi.number().required().greater(0),
    categoryId: joi.number().required(),
    pricePerDay: joi.number().required().greater(0)
  });

  if (error) {
    return res.sendStatus(400);
  };

  const { error } = gameSchema.validate(game);
}