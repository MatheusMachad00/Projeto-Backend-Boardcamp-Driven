import connection from "../dbStrategy/postgres.js";

export async function getCategories(_, res) {
  try {
    const { rows: categories } = await connection.query('SELECT * FROM categories');
    res.send(categories);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}

export async function insertCategory(req, res) {
  try {
    const { name } = req.body;

    await connection.query('INSERT INTO categories (name) VALUES ($1)', [name]);
    res.sendStatus(201);

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}