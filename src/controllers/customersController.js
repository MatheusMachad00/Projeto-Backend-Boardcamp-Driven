import connection from "../dbStrategy/postgres.js";

export async function getCustomers(req, res) {
  let { cpf } = req.query;
  if (!cpf) cpf = '';
  try {

    if (cpf !== '') {
      let newCpf = cpf.concat(':*');
      const { rows: customers } = await connection.query(`
      SELECT * FROM customers WHERE to_tsvector(cpf) @@ to_tsquery($1)
      `, [newCpf]);

      res.send(customers);
    } else {
      const { rows: customers } = await connection.query('SELECT * FROM customers');
      res.send(customers);
    }

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}

export async function getCustomerById (req,res) {
  const {id} = req.params;
  console.log(id)
  try {
    const {rows: customer} = await connection.query(`
    SELECT * FROM customers where id = $1`, [id]);
    if(!customer) return res.status(404).send('Usuário não encontrado');
    res.status(200).send(customer);

  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}


export async function createCustomer(req, res) {
  try {
    const { name, phone, cpf, birthday } = req.body;

    await connection.query(
      `
      INSERT INTO customers (name, phone, cpf, birthday) 
      VALUES ($1,$2,$3,$4);
      `,
      [name, phone, cpf, birthday]
    );

    res.sendStatus(201);
  } catch (error) {

  }
}
