//Import database
const knex = require('../db');

//Retrieve all items
exports.bsAll = async(req, res) => {
  //Get all best scores from database
  knex
    .select('*') // select all records
    .from('snake') // from snake database
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      //Send an error message in response
      res.json({ message: `There was an error retrieving best score: ${err}`});
    })
}

//Create new best score
exports.bsCreate = async (req, res) => {
  //Add new best score
  knex('snake')
    .insert({
      'bscore': req.body.bscore,
    })
    .then(() => {
      res.json({ message: `Best score ${req.body.bscores}`});
    })
    .catch(err => {
      res.json({ message: `There was an error creating ${req.body.bscore}`});
    })
}

//Remove specific score
exports.bsDelete = async (req, res) => {
  //Find specific score in the database and delete it
  knex('snake')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      res.json({message: `Best score ${req.body.id} deleted`});
    })
    .catch(err => {
      res.json({message: `There was an error deleting ${req.body.id}`});
    })
}

//Remove all scores
exports.bsReset = async (req, res) => {
  knex
    .select('*') //select all records
    .from('snake')
    .truncate() //remove the selection
    .then(() => {
      res.json({message: `Scores cleared`});
    })
    .catch(err => {
      res.json({message: `There was an error resetting scores: ${err}`})
    })
}