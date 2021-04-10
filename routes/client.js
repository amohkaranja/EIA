const express = require ('express');

const controllers = require('../controllers/client')

const router = express.Router();

router.get('/new-client',controllers.getNewClient);

router.get('/client-profile',controllers.getClientProfile);

router.post('/new-client',controllers.postClient);

module.exports= router;