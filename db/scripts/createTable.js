const mySql = require("mysql");
require("dotenv/config");

// Compress-Archive -Path 'C:\Users\stefa\OneDrive\Desktop\Projekti\CRM/crm-api/dist' -DestinationPath 'C:\Users\stefa\OneDrive\Desktop\Projekti\CRM\build152.zip'

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
    zip VARCHAR(30),  
    city VARCHAR(30), 
    country VARCHAR(30), 
    industry VARCHAR(30),
    employees VARCHAR(20), 
    description VARCHAR(200), 
    createdBy INT,
    owner INT,
    website VARCHAR(60), 
    archived TINYINT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) 
    ENGINE=InnoDB AUTO_INCREMENT=1000`;

const create_table_auth = `CREATE TABLE auth (
    _id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    verified TINYINT DEFAULT 0,
    lastLogin TIMESTAMP,
    failedAttempts INT DEFAULT 0)`;

const create_table_verification_sessions = `CREATE TABLE verification_sessions (
      _id INT PRIMARY KEY,
      code VARCHAR(20) NOT NULL,
      created TIMESTAMP)`;

const users = `CREATE TABLE users (
    _id INT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    role VARCHAR(50),
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    birthday DATE,
    phone VARCHAR(20),
    address VARCHAR(255),
    city VARCHAR(40),
    zip VARCHAR(20),
    country VARCHAR(100),
    avatar VARCHAR(255),
    organization INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active'
);`;

const organizations = `CREATE TABLE organizations (
  _id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  industry VARCHAR(100),
  website VARCHAR(100),
  address VARCHAR(255),
  city VARCHAR(40),
  zip VARCHAR(20),
  country VARCHAR(100),
  createdBy INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'active'
);`;

const createTableQuery = organizations;

const createTable = async () => {
  try {
    await query(createTableQuery);
    console.log("TABLE CREATED");
  } catch (error) {
    console.log(error);
  }
};

createTable();