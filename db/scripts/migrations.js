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

const table = "leads";

const query1 = `ALTER TABLE ${table} ADD COLUMN createdBy INT;`;

const query2 = `UPDATE ${table} SET createdBy = '1'`;

const migrate = async () => {
  try {
    await query(query1);
    await query(query2);
    console.log("TABLE DROPPED");
  } catch (error) {
    console.log(error);
  }
};

migrate();
