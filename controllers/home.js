const User = require('../models/user');



exports.getIndex= (req,res,next) =>{
    res.render('index', {
        pageTitle: 'home',
        path: '/',
        // isAuthenticated: req.session.isLoggedIn
})
};

exports.postLogin = (req,res,next)=>{
    res.render('dashboard', {
        pageTitle: 'dashboard',
        path: '/',
        // isAuthenticated: req.session.isLoggedIn
})
};

exports.postLogout =(req,res,next)=>{
    res.render('index', {
        pageTitle: 'home',
        path: '/',
        // isAuthenticated: req.session.isLoggedIn 
    }) 
};