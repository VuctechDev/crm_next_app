import mySql from "mysql";

const pool = mySql.createPool({
  connectionLimit: 1000,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: 3306,
});

export const query = <T>(
  query: string,
  values?: (string | number)[][]
): Promise<T> => {
  const start = new Date().getTime();
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      connection.query(query, [values], (err, res) => {
        connection.release();
        if (err) {
          console.log("ERROR QUERY: ", query);
          return reject(err);
        }
        console.log("SUCCESS QUERY: ", query);
        console.log(`QUERY TOOK: ${(new Date().getTime() - start) / 1000}s`);
        return resolve(res);
      });
    });
  });
};
