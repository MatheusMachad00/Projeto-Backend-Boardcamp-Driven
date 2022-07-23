import joi from "joi";
import connection from "../dbStrategy/postgres.js";

export async function validadteCustomer(req, res, next) {
  const category = req.body;

  const categorySchema = joi.object({
    name: joi.string().required().min(1),
    phone: joi.string().min(10).max(11).required().pattern(/^([0-9]{10})([0-9]{1})?$/),
    cpf: joi.string().pattern(/^[0-9]{11}$/).required().max(11).min(11),
    birthday: joi.date().raw().required()
  });

  const validation = categorySchema.validate(category);

  if (validation.error) {
    return res.status(400).send(validation.error.details.map(detail => detail.message))
  };

  const checkcpf = await connection.query('SELECT * FROM customers WHERE cpf = ($1)', [category.cpf]);

  if (checkcpf.rows.length != 0) {
    return res.status(409).send({ errorMessage: "CPF já cadastrado." });
  };

  next();
}