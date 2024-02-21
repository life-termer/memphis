//Import express
const express = require('express');

//Import snake-controller
const snakeRoutes = require('./../controllers/snake-controller.js');

//Create router
const router = express.Router();

//Add route for GET request to retrieve all sores
//In server.js snake route is specified as '/snake', this means that '/all' translates to 'snake/all'
router.get('/all', snakeRoutes.bsAll);

//Add route for POST request
router.post('/create', snakeRoutes.bsCreate);

//Add router for PUT request
router.put('/delete', snakeRoutes.bsDelete);

router.put('/reset', snakeRoutes.bsReset);

//Export router
module.exports = router;