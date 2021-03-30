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

router.post('/create',controllers.postCreate);

router.get('/admin',controllers.getAdmin);

router.get('/new-user',controllers.getNewUser);

router.get('/reset',controllers.getReset);

router.post('/reset',controllers.postReset);

router.get('/reset/:token',controllers.getNewpassword);

router.post('/newPassword',controllers.postNewPassword);

module.exports= router;