import connection from "../dbStrategy/postgres.js";

export async function getGames(req, res) {
  let { name } = req.query;
  if(!name) name = '';
  try {
    

    if(name !== ''){
      let newName = name.concat(':*');
      const { rows: games } = await connection.query(`
      SELECT * FROM games WHERE to_tsvector(name) @@ to_tsquery($1)
      `, [newName]);

    res.send(games);
    }else{
      const { rows: games } = await connection.query(`
          SELECT games.*, categories.name AS "categoryName"
          FROM games
          JOIN categories
          ON games."categoryId" = categories.id;`);
    
        res.send(games);
    }

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}

export async function postGame(req, res) {
  try {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    await connection.query(
      `
      INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
      VALUES ($1,$2,$3,$4,$5);
      `,
      [name, image, stockTotal, categoryId, pricePerDay]
    );

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}