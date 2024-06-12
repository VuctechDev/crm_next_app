import mySql from "mysql";

const db_user = "pikadone";
const db_pass = "n4w55S9;rkXD*U";
const db_host = "sv95.ifastnet.com";
const db_db = "pikadone_monitoring_smoke";

const pool = mySql.createPool({
  connectionLimit: 1000,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: 3306,
});

export const query = (query: string, values?: (string | number)[][]) => {
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

const create_table_leads = `CREATE TABLE leads (
    _id INT AUTO_INCREMENT PRIMARY KEY, 
    firstName VARCHAR(30), 
    lastName VARCHAR(30), 
    role VARCHAR(50), 
    company VARCHAR(50), 
    email VARCHAR(40),  
    phone VARCHAR(30), 
    mobile VARCHAR(30), 
    address VARCHAR(50),
    postCode VARCHAR(30),  
    city VARCHAR(30), 
    country VARCHAR(30), 
    industry VARCHAR(30),
    employees VARCHAR(20), 
    description VARCHAR(200), 
    website VARCHAR(60), 
    archived TINYINT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) 
    ENGINE=InnoDB AUTO_INCREMENT=1000`;

const create_table_users = `CREATE TABLE leads (
      _id INT AUTO_INCREMENT PRIMARY KEY, 
      firstName VARCHAR(30), 
      lastName VARCHAR(30), 
      role VARCHAR(50), 
      company VARCHAR(50), 
      email VARCHAR(40),  
      phone VARCHAR(30), 
      mobile VARCHAR(30), 
      address VARCHAR(50),
      postCode VARCHAR(30),  
      city VARCHAR(30), 
      country VARCHAR(30), 
      industry VARCHAR(30),
      employees VARCHAR(20), 
      description VARCHAR(200), 
      website VARCHAR(60), 
      archived TINYINT,
      created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) 
      ENGINE=InnoDB AUTO_INCREMENT=1000`;

const create_table_auth = `CREATE TABLE auth (
    _id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    lastLogin TIMESTAMP,
    failedAttempts INT DEFAULT 0)`;

const createTableQuery = create_table_auth;
const dropTableQuery = "DROP TABLE leads";

export const createTable = async () => {
  try {
    await query(createTableQuery);
    console.log("TABLE CREATED");
  } catch (error) {
    console.log(error);
  }
};

export const dropTable = async () => {
  try {
    await query(dropTableQuery);
    console.log("TABLE DROPPED");
  } catch (error) {
    console.log(error);
  }
};
