const mySql = require("mysql");
require("dotenv/config");

const pool = mySql.createPool({
  connectionLimit: 1000,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: 3306,
});

const query = (query, values) => {
  console.log("QUERY: ", query);
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      connection.query(query, [values], (err, res) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    });
  });
};

const table = "email_signatures";

const renameQuery = `ALTER TABLE ${table} RENAME COLUMN postCode TO zip;`;
const dropQuery = `ALTER TABLE ${table} DROP COLUMN organization`;
const addQuery = `ALTER TABLE ${table} ADD recipientEmail VARCHAR(50);`;
const updateQuery = `UPDATE ${table} SET to = ''`;

const migrate = async () => {
  try {
    await query(dropQuery);
    // await query(updateQuery);
    console.log("TABLE UPDATED");
  } catch (error) {
    console.log(error);
  }
};

migrate();
