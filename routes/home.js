const express = require ('express');

const controllers = require('../controllers/home')

const router = express.Router();

router.get('/',controllers.getIndex);

router.post('/login',controllers.postLogin);

router.post('logout',controllers.postLogout);


module.exports= router;