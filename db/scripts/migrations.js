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

const table = "usages";

const renameQuery = `ALTER TABLE ${table} RENAME COLUMN email TO emails;`;
const renameQuery2 = `ALTER TABLE ${table} RENAME COLUMN recipient TO lead;`;
const renameQuery3 = `ALTER TABLE ${table} RENAME COLUMN recipientEmail TO \`to\`;`;
const dropQuery = `ALTER TABLE ${table} DROP COLUMN password`;
const addQuery = `ALTER TABLE ${table} ADD email INT DEFAULT 0;`;
const addQuery2 = `ALTER TABLE ${table} ADD tags JSON NOT NULL;`;
const changeTypeQuery = `ALTER TABLE ${table} MODIFY description VARCHAR(500);`;
const updateQuery = `UPDATE ${table} SET tags = '[]'`;

const migrate = async () => {
  try {
    // await query(addQuery);
    // await query(dropQuery);
    // await query(addQuery2);
    // await query(renameQuery);
    // await query(renameQuery2);
    // await query(renameQuery3);
    await query(renameQuery);
    console.log("TABLE UPDATED");
  } catch (error) {
    console.log(error);
  }
};

migrate();
