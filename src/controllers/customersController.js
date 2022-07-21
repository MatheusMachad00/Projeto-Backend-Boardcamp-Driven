import connection from "../dbStrategy/postgres.js";

export async function getCustomers(_, res) {
  try {
    const { rows: customers } = await connection.query('SELECT * FROM customers');
    res.send(customers);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}