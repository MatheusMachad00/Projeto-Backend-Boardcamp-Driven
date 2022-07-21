import joi from "joi";
import connection from "../dbStrategy/postgres.js";

export async function validateCategory(req, res, next) {
  const category = req.body;
  console.log(category);

  const categorySchema = joi.object({
    name: joi.string().required().min(1),
  });

  const { error } = categorySchema.validate(category);

  if (error) {
    return res.status(400).send({ errorMessage: "O campo do nome não pode está vazio." });
  };

  /* const checkName = await connection.query('SELECT * FROM categories WHERE name = ($1)', [name]);

  if(checkName){
    return res.status(409).send({ errorMessage: "Categoria já cadastrada." });
  }; */

  res.locals.category = category;
  next();
}