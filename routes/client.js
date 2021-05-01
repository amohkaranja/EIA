const express = require ('express');

const controllers = require('../controllers/client')

const router = express.Router();

router.get('/new-client',controllers.getNewClient);

router.get('/client-profile/:clientId',controllers.getClientProfile);

router.post('/new-client',controllers.postClient);

router.get('/images/myclient.kraCert',controllers.getKraCert);

router.get('/motor-details/:clientId',controllers.getMotor);
router.get('/non-motor-details/:clientId',controllers.getNonMotor);

router.post('/motor-details',controllers.postMotor);

module.exports= router;