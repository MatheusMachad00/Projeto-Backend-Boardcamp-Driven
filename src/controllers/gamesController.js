import connection from "../dbStrategy/postgres.js";

export async function getGames(_, res) {
  try {
    const { rows: games } = await connection.query('SELECT * FROM games');
    res.send(games);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}

export async function postGame(req, res) {
  try {

  } catch (error) {

  }
}