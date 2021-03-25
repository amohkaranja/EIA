const express = require ('express');

const controllers = require('../controllers/home')

const router = express.Router();

router.get('/',controllers.getIndex);

router.get('/index',controllers.getIndex);

router.post('/login',controllers.postLogin);

router.get('/logout',controllers.postLogout);

router.get('/dashboard',controllers.getDashboard);

router.get('/mv-details',controllers.getMvdetails);

router.get("/underwriting",controllers.getUnderwriting);

router.get('/new-policy',controllers.getNewpolicy);

router.post('/signup',controllers.postSignup);

router.get('/signup',controllers.getSignup)


module.exports= router;