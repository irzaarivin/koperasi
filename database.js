require('dotenv').config({ path: './.env' })

const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : process.env.DB_HOST,
      port : process.env.DB_PORT,
      user : process.env.DB_USERNAME,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE
    }
})

const testConnection = async () => {
  try {
    const result = await knex.raw('SHOW TABLES');
    console.log('Connected to database', process.env.DB_DATABASE);
    console.log('Tables:', JSON.stringify(result[0].map(table => table.Tables_in_koperasi)));
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

module.exports = { database: knex, testConnection }