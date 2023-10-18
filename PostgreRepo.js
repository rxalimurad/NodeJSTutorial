const pool = require('./config');

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
  )
`;

const deleteTableQuery = `
  DROP TABLE users
`;

const insertQuery = `
INSERT INTO users (username, email)
VALUES ($1, $2)
RETURNING *
`;

 async function createUsersTable() {
    try {
        console.log("creating table in repo");
        let result =  await pool.query(createTableQuery);
        return result;
    } catch(err) {
        console.log("error creating table in repo");
        throw err
    }
}
async function addUser(userData) {
        console.log("adding user in db");
        console.log(userData);
        const { username, email } = userData;

        try {   
        const result = await pool.query(insertQuery, [username, email]);
        return result.rows[0];
    } catch(err) {
        throw err
    }
}


async function deleteUserTable() {
    try {
        console.log("deleting table in repo");
        let result =  await pool.query(deleteTableQuery);
        return result;

    } catch (err) {
        throw err
    }
}


module.exports = { createUsersTable, deleteUserTable, addUser } 

