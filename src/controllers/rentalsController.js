import connection from "../dbStrategy/postgres.js";

export async function getRentals(req, res) {
  try {
    const { rows: rentals } = await connection.query(`
    SELECT rentals.*, customers.id as "customerId", customers.name as "customerName",
    games.id as "gameId", games.name as "gameName", games."categoryId"
    FROM rentals
    JOIN customers ON rentals."customerId" = customers.id 
    JOIN games ON rentals."gameId" = games.id
    `);

    /* const customerJoin = {
      ...rentals[0],
      customer: rentals.map(value => value.customerName)
    } */



    res.send(rentals);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}

export async function createRental(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  try {
    await connection.query(
      `
      INSERT INTO rentals ("customerId", "gameId", "daysRented")
      VALUES ($1, $2, $3)
      `,
      [customerId, gameId, daysRented]
    );

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}

export async function deleteRental(req, res) {
  const { id } = req.params;
  try {

    const checkId = await connection.query('SELECT * FROM rentals WHERE id = $1', [id]);

    if (!checkId) {
      res.sendStatus(404);
    } else {
      await connection.query('DELETE FROM rentals WHERE id = $1', [id]);
      res.sendStatus(200);
    }

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}