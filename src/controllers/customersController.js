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

export async function getCustomerById(req, res) {
  const { id } = req.params;
  try {
    const { rows: customer } = await connection.query(`
    SELECT * FROM customers where id = $1`, [id]);

    if (!customer) {
      return res.status(404).send('Usuário não encontrado');
    } else {
      res.status(200).send(customer);

    }

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
    res.sendStatus(500);
    console.error(error);
  }
}

export async function updateCustomer(req, res) {
  const { id } = req.params
  const { name, phone, cpf, birthday } = req.body
  try {
    const customer = await connection.query(`
    UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 
    WHERE id = $5`, [name, phone, cpf, birthday, id])
    res.sendStatus(200)
} catch {
  res.sendStatus(500);
  console.error(error);
}
}
