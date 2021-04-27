const express = require ('express');

const controllers = require('../controllers/client')

const router = express.Router();

router.get('/new-client',controllers.getNewClient);

router.get('/client-profile/:clientId',controllers.getClientProfile);

router.post('/new-client',controllers.postClient);

router.get('downloads/:myclientId',controllers.getKraCert);

module.exports= router;