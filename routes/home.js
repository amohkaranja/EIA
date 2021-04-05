const express = require ('express');

const controllers = require('../controllers/home')
const controller = require('../controllers/logs')

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

router.get('/user-profile-view/:userId',controllers.getUserProfile);

router.post('/user-profile-view',controllers.postEditUser);

router.post('/delete-user',controllers.postDeleteUser);

router.post('/reset-flag',controllers.postResetFlag);

router.get('/manage-users',controllers.getManageUsers);

router.get('/logs',controllers.getLogs);

router.post('/logs',controller.PostLogs);

module.exports= router;