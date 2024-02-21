//Import path module
const path = require('path');

//Get the location of database
const dbPath = path.resolve(__dirname, 'db/memphis.sqlite');

//Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

//Create a table in the database
knex.schema
  //Make sure table doens not exist before creation
  .hasTable('snake')
    .then((exists) => {
      if(!exists) {
        return knex.schema.createTable('snake', (table) => {
          table.increments('id').primary()
          table.integer('bscore')
        })
        .then(() => {
          // Log success message
          console.log('Table snake created');
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        })
      }
    })
    .then(() => {
      //Log success message
      console.log('Done');
    })
    .catch((error) => {
      console.error(`There was an error setting up the database ${error}`);
    })

// Log all data in snake table
// knex.select('*').from('snake')
//   .then(data => console.log('data: ', data))
//   .catch(err => console.log(err))

//Export the database
module.exports = knex;